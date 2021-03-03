import React, { useState, useEffect } from "react"
import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react'

const Calculator = (props) => {

  const {grossProfit, netProfit, entry, priceChange} = props

  const [grossArrow, setGrossArrow] = useState("increase")
  const [netArrow, setNetArrow] = useState("increase")
  const [grossPercent, setGrossPercent] = useState(0)
  const [netPercent, setNetPercent] = useState(0)


  useEffect(() => {
    setGrossPercent(entry === 0 ? 0 : ((grossProfit / entry) * 100).toFixed(2))
    setNetPercent(entry === 0 ? 0 : ((netProfit / entry) * 100).toFixed(2)) 
    setGrossArrow(grossProfit >= 0 ? "increase" : "decrease")
    setNetArrow(netProfit >= 0 ? "increase" : "decrease")
  }, [grossPercent ,netPercent ,grossArrow, netArrow, grossProfit, netProfit, priceChange, entry])

  return (
    <StatGroup>
        <Stat>
            <StatLabel>Gross Profit</StatLabel>
            <StatNumber>{props.grossProfit}</StatNumber>
            <StatHelpText>
            <StatArrow type={grossArrow} />
            {grossPercent}%
            </StatHelpText>
        </Stat>

        <Stat>
            <StatLabel>Profit After Fees</StatLabel>
            <StatNumber>{props.netProfit}</StatNumber>
            <StatHelpText>
            <StatArrow type={netArrow} />
            {netPercent}%
            </StatHelpText>
        </Stat>

        <Stat>
            <StatLabel>Liquidation Price</StatLabel>
            <StatNumber>{props.liquidationPrice}</StatNumber>
        </Stat>
    </StatGroup>
  )
}

export default Calculator