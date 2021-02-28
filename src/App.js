import React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Center,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading
} from '@chakra-ui/react';
import Calculator from './components/Calculator'
import Nav from './components/Nav'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl">
        <Nav />
        <Calculator />
      </Container>
    </ChakraProvider>
  );
}

export default App;
