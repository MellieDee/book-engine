import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';


import {
  ApolloClient,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';







// establish new link to GQL server @ endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
})


// setContext() to get token from LStorage & set HTTP req headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItme('id_token');
  return {
    headers: {
      ...headers,
      authoriztaion: token ? `Bearer ${token}` : '',
    },
  };
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
