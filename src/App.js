import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Comic from './pages/Comic';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Comic />
    </ChakraProvider>
  );
}

export default App;
