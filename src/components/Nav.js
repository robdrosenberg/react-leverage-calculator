import React from "react"
import { Flex, Spacer, Box, Heading } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Nav = ({ }) => {
  return (
    <Flex mt={2} align="center">
      <Box p="2">
        <Heading as="h2">Leverage Trading Calculator</Heading>
      </Box>
      <Spacer />
      <Box>
        <ColorModeSwitcher />
      </Box>
    </Flex>
  )
}

export default Nav