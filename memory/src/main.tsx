import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import App from './component/App.tsx';
import './App.scss';
import 'animate.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MantineProvider } from '@mantine/core';

//configurazione apollo client
const client = new ApolloClient({
  uri: 'http://matteo.it/',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);