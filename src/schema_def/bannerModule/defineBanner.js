import { gql } from "apollo-server-express";

import { Op, db, Banner } from "../../database/db_connector/connectors";

export const typeDef = gql`
  extend type Mutation {
    addBanner(
      bannerType: String!
      bannerUrl: String!
      isBanner: Boolean!
      bannerAlt: String
    ): Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    async addBanner(root, args, context) {
      let transaction = await db.transaction();
      try {
        let createBanner = await Banner.create(
          {
            bannerType: args.bannerType,
            bannerUrl: args.bannerUrl,
            isBanner: args.isBanner ? args.isBanner : false,
            bannerAlt: args.bannerAlt ? args.bannerAlt : null,
          },
          {
            transaction,
          }
        );

        await transaction.commit();

        return true;
      } catch (err) {
        console.log("Error:", err.toString());
        await transaction.rollback();
        return false;
      }
    },
  },
};
