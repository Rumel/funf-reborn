import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import Store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
