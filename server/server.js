const express = require('express');
const path = require('path');

//import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// can import middleware here  for the apollo server for user login
const { authMiddleware } = require('./utils/auth');

// import TypeDefs and resovlers
const { typeDefs, resolvers } = require('./Schema');

// import the database from config file
const db = require('./config/connection');
const { start } = require('repl');

//define the port for express
const PORT = process.env.PORT || 3001;

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //   (this is for middleware to be used in the context params in resolver functions)
  context: authMiddleware
});

// create new app from express
const app = express();

// use middleware for express to read JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  //integrate our Apolo server with the Express application as middlware
  server.applyMiddleware({ app });

  // serve up static assets for production mode
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // start up the database
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server runningon port ${PORT}!`);
    });
  });
};

// call the async function to start the server

startApolloServer(typeDefs, resolvers);
