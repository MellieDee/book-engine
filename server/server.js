const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
    // context: ({ req }) => req.headers //see the incoming request and return only the headers. On the resolver side, those headers would become the context parameter.
    // instead change to authMidWare & every req gets auth check and auth obj passed to resolvers as context
  })
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer()

// const routes = require('./routes');
// app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve static assets
// if Node is in production then serve React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// If make req to any route not specified, (ie wildcard route) then load index.html from client - prduction FE build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
}); 
