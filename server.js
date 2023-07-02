/*
 * @Author: Rahul Kallur
 * @Date: 2023-05-26 19:30:14
 */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import dotenv from 'dotenv';
import { TYPEDEFS, RESOLVERS } from './src/schema';

dotenv.config();

// GraphQL Port
const GRAPHQL_PORT = process.env.SERVER_PORT;

// GraphQL Server Initialization
const app = express();

// End Point Configuration
const server = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
  context: async ({ req }) => {
    if (req && req.headers) {
      let reqObj = req.headers;
      return reqObj;
    }
  },
  // Format Error
  formatError: (error) => {
    console.error(JSON.stringify(error));
    // console.error(JSON.stringify(error.message));
    throw {
      message: error.message,
    };
  },
});

server.applyMiddleware({
  app,
  bodyParserConfig: {
    extended: true,
    limit: '50mb',
  },
});

const appServer = app.listen(GRAPHQL_PORT, () =>
  console.log(
    `🚀 Playground is now running on http://localhost:${GRAPHQL_PORT}/graphql`
  )
);

appServer.timeout = 2400000;
