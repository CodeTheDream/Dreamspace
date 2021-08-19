import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from "@chakra-ui/react"
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <ChakraProvider>
  <FirebaseContext.Provider value={new Firebase()}>
    {<App />} 
  
  </FirebaseContext.Provider>
  </ChakraProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
