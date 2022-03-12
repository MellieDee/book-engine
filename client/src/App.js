import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { InMemoryCache, setContext } from '@apollo/client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

// ----------------- Pages ------------------
import Navbar from './components/Navbar';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';


// establish new link to GQL server @ endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
})


// setContext() to get token from LStorage & set HTTP req headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authoriztaion: token ? `Bearer ${token}` : '',
    },
  };
});

// use Apollo Client to instantiate Client instance and create connection to endpoint
const cient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
