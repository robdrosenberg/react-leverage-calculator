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
} from '@chakra-ui/react'

const Calculator = ({ }) => {
  const [tradeType, setTradeType] = useState("Long")
  const [quantity, setQuantity] = useState(0)
  const [leverage, setLeverage] = useState(0)
  const [entry, setEntry] = useState(0)
  const [exit, setExit] = useState(0)
  const [profit, setProfit] = useState("")

  const handleQuantityChange = (event) => setQuantity(event.target.value)
  const handleLeverageChange = (event) => setLeverage(event.target.value)
  const handleEntryChange = (event) => setEntry(event.target.value)
  const handleExitChange = (event) => setExit(event.target.value)

  useEffect(() => {
    let margin = quantity * leverage / entry
    let priceChange = tradeType === "Long" ? exit - entry : entry - exit
    setProfit(margin * priceChange)
  }, [tradeType, quantity, leverage, entry, exit, profit])

  return (
    <Center mt={20}>
      <Stack spacing={10}>
        <FormControl isRequired>
          <FormLabel>Set Trade Type</FormLabel>
          <RadioGroup onChange={setTradeType} value={tradeType}>
            <Stack direction="row">
              <Radio colorScheme="green" value="Long">Long</Radio>
              <Radio colorScheme="red" value="Short">Short</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
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
        <p>Profit: {profit} </p>
      </Stack>
    </Center>
  )
}

export default Calculator