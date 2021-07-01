import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import './App.css';
import Home from './component/Home'
import config from './config.json';

const token = process.env.REACT_APP_API_TOKEN;

const client = new ApolloClient({
  uri: config.gqlBaseUri,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${token}`
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
