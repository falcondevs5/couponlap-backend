import { merge } from 'lodash';

import { gql } from 'apollo-server-express';

import GraphQLJSON from 'graphql-type-json';

import {
  typeDef as loginCreation,
  resolvers as loginCreationResolvers,
} from './schema_def/loginModule/loginCreation';

import {
  typeDef as categoryCreation,
  resolvers as categoryCreationResolvers,
} from './schema_def/categoryModule/defineCategory';

import {
  typeDef as couponCreation,
  resolvers as couponCreationResolvers,
} from './schema_def/couponModule/defineCoupon';


// Default Query Mutation Initialization
const Query = gql`
  scalar JSON

  type Query {
    _empty: String
  }
  type Mutation {
    _emptyMutation: String
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
};

const TYPEDEFS = [
  Query,
  loginCreation,
  categoryCreation,
  couponCreation
];

const RESOLVERS = merge(
  resolvers,
  loginCreationResolvers,
  categoryCreationResolvers,
  couponCreationResolvers
);

export { TYPEDEFS, RESOLVERS };
