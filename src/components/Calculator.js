import React, { useState, useEffect } from "react"
import {
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormControl,
  Flex,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Spacer
} from '@chakra-ui/react'

const Calculator = () => {
  const [tradeType, setTradeType] = useState("Long")
  const [orderType, setOrderType] = useState("Market")
  const [quantity, setQuantity] = useState(0)
  const [leverage, setLeverage] = useState(0)
  const [entry, setEntry] = useState(0)
  const [exit, setExit] = useState(0)
  const [grossProfit, setGrossProfit] = useState("")
  const [netProfit, setNetProfit] = useState("")
  const [liquidationPrice, setLiquidationPrice] = useState("")

  const handleQuantityChange = (event) => setQuantity(event.target.value)
  const handleLeverageChange = (event) => setLeverage(event.target.value)
  const handleEntryChange = (event) => setEntry(event.target.value)
  const handleExitChange = (event) => setExit(event.target.value)

  useEffect(() => {
    let margin = quantity * leverage / entry
    let priceChange = tradeType === "Long" ? exit - entry : entry - exit
    let fee = orderType === "Market" ? margin * entry * 0.00075 : margin * entry * -0.00025
    setLiquidationPrice(tradeType === "Long" ? (entry * leverage) / (Number(leverage) +1 - (.005 * leverage)) : 
                                               (entry * leverage) / (leverage -1 + (.005 * leverage))
                        )
    setGrossProfit(margin * priceChange)
    setNetProfit((margin * priceChange) - fee)
  }, [tradeType, orderType, quantity, leverage, entry, exit, grossProfit, netProfit, liquidationPrice])

  return (
    <Center mt={20}>
      <Stack spacing={10}>
        <Flex>
          <FormControl isRequired>
            <FormLabel>Set Trade Type</FormLabel>
            <RadioGroup onChange={setTradeType} value={tradeType}>
              <Stack direction="row">
                <Radio colorScheme="green" value="Long">Long</Radio>
                <Radio colorScheme="red" value="Short">Short</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Set Order Type</FormLabel>
            <RadioGroup onChange={setOrderType} value={orderType}>
              <Stack direction="row">
                <Radio colorScheme="blue" value="Market">Market</Radio>
                <Radio colorScheme="blue" value="Limit">Limit</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mr={5}>
            <FormLabel>Quantity</FormLabel>
            <InputGroup>
              <Input value={quantity} onChange={handleQuantityChange} />
              <InputRightAddon children="USD" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Leverage</FormLabel>
            <InputGroup>
              <InputLeftAddon children="x" />
              <Input value={leverage} onChange={handleLeverageChange} />
            </InputGroup>
          </FormControl>
        </Flex>
        <Flex>
          <FormControl mr={5}>
            <FormLabel>Entry</FormLabel>
            <InputGroup>
              <Input value={entry} onChange={handleEntryChange} />
              <InputRightAddon children="USD" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Exit</FormLabel>
            <InputGroup>
              <Input value={exit} onChange={handleExitChange} />
              <InputRightAddon children="USD" />
            </InputGroup>
          </FormControl>
        </Flex>
        <Flex>
          <p>Profit: {grossProfit.toFixed(2)} </p>
          <Spacer />
          <p>Liquidation Price: {liquidationPrice.toFixed(2)}</p>
        </Flex>
          <p>Profit after Fees: {netProfit.toFixed(2)}</p>
        
      </Stack>
    </Center>
  )
}

export default Calculator