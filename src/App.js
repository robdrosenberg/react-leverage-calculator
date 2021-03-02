import React from 'react';
import {
  ChakraProvider,
  Container,
  theme,
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
