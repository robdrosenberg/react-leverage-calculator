import React, { useState, useEffect } from "react"
import Stats from "./Stats"
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
  Stack
} from '@chakra-ui/react'

const Calculator = () => {
  const [tradeType, setTradeType] = useState("Long")
  const [orderType, setOrderType] = useState("Market")
  const [quantity, setQuantity] = useState(0)
  const [leverage, setLeverage] = useState(1)
  const [entry, setEntry] = useState(0)
  const [exit, setExit] = useState(0)
  const [grossProfit, setGrossProfit] = useState(0)
  const [netProfit, setNetProfit] = useState(0)
  const [priceChange, setPriceChange] = useState(0)
  const [liquidationPrice, setLiquidationPrice] = useState("")

  const handleQuantityChange = (event) => setQuantity(event.target.value)
  const handleLeverageChange = (event) => setLeverage(event.target.value)
  const handleEntryChange = (event) => setEntry(event.target.value)
  const handleExitChange = (event) => setExit(event.target.value)

  useEffect(() => {
    let margin = entry === 0 ? 0 : quantity * leverage / entry
    setPriceChange(tradeType === "Long" ? exit - entry : entry - exit)
    let fee = orderType === "Market" ? margin * entry * 0.00075 : margin * entry * -0.00025
    setLiquidationPrice(tradeType === "Long" ? ((entry * leverage) / (Number(leverage) + 1 - (.005 * leverage))).toFixed(2) :
      ((entry * leverage) / (leverage - 1 + (.005 * leverage))).toFixed(2)
    )
    setGrossProfit(entry === 0 ? 0 : (margin * priceChange).toFixed(2))
    setNetProfit(entry === 0 ? 0 : ((margin * priceChange) - fee).toFixed(2))
  }, [tradeType, orderType, quantity, leverage, entry, exit, grossProfit, netProfit, liquidationPrice, priceChange])

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

        {/* <Flex>
          <p>Profit: {grossProfit} </p>
          <Spacer />
          <p>Liquidation Price: {liquidationPrice}</p>
        </Flex>
          <p>Profit after Fees: {netProfit}</p> */}
        <Stats
          grossProfit={grossProfit}
          netProfit={netProfit}
          liquidationPrice={liquidationPrice}
          priceChange={priceChange}
          entry={entry}
        />

      </Stack>
    </Center>
  )
}

export default Calculator