import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
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

// use Apollo Client constructor() to instantiate Client instance of AC and create connection to endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Enable whole app to use Apollo Client
// Wrap the app in ApolloProvider - cllient var is the prop so everything in JSX has access to server/ data through the Client Prop
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
