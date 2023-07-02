import { gql } from "apollo-server-express";

import { Op, db, Category } from "../../database/db_connector/connectors";

export const typeDef = gql`
  extend type Query {
    getAllCategories(catgoryId: Int): [Category]!
  }

  extend type Mutation {
    addCategory(categoryName: String!, categoryType: String): Boolean!
  }

  type Category {
    categoryId: Int!
    categoryName: String!
    categoryType: String
    createdAt: String!
    updatedAt: String!
    status: Int!
  }
`;

export const resolvers = {
  Query: {
    async getAllCategories(root, args, context) {
      if (args.categoryId) {
        let categoryDetails = await Category.findAll({
          where: {
            categoryId: args.categoryId,
          },
        });

        if (categoryDetails) {
          return categoryDetails;
        } else {
          return [];
        }
      } else {
        let categoryDetails = await Category.findAll({});
        if (categoryDetails) {
          return categoryDetails;
        } else {
          return [];
        }
      }
    },
  },

  Mutation: {
    async addCategory(root, args, context) {
      let category = await Category.findOne({
        where: {
          categoryName: args.categoryName,
        },
      });

      if (category) {
        throw new Error("Category Name already exists!!!!!!!!");
      }
      const currentTimestamp = Math.floor(Date.now() / 1000);
      let transaction = await db.transaction();

      try {
        let categoryDetails = await Category.create(
          {
            categoryName: args.categoryName,
            categoryType: args.categoryType ? args.categoryType : null,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            status: 1,
          },
          {
            transaction,
          }
        );

        await transaction.commit();
        return true;
      } catch (err) {
        await transaction.rollback();
        console.log("Error:", err.toString());

        return false;
      }
    },
  },
};
