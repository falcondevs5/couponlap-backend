const axios = require("axios");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import each from "async/each";
import { request } from "graphql-request";
import { gql } from "apollo-server-express";

import { APP_SECRET, APP_SECRET_REFRESH, roleDescription } from "../../utils";

import { Login, db, Op } from "../../database/db_connector/connectors";

export const typeDef = gql`
  extend type Query {
    login(
      username: String!
      password: String!
      accountType: String
    ): AuthPayload
  }

  type Login {
    loginId: Int!
    username: String!
    accountType: String!
    status: Int!
    lastLoginTime: String
  }

  """
  Response type for login API
  """
  type AuthPayload {
    """
    Token generated for the login. Expire time is pre defined.
    """
    token: String
    """
    Refresh token generated for the login. Expire time is greater than normal token.
    """
    refreshToken: String
    """
    Login object.
    """
    login: Login
  }
`;

export const resolvers = {
  Query: {
    async login(root, args, context) {
      const { accountType } = args;
      let loginObj = {};

      const loginDeactive = await Login.findOne({
        where: {
          username: args.username,
        },
        raw: true,
      });
      // console.log("Login details are", JSON.stringify(loginDeactive));
      if (loginDeactive) {
        if (loginDeactive.status === 0) {
          throw new Error("Account is Deactivated");
        }
      }

      if (accountType) {
        // console.log("Account type is", accountType);

        loginObj = await Login.findOne({
          where: {
            username: args.username,
            accountType,
            status: 1,
          },
          raw: true,
        });
      } else {
        loginObj = await Login.findOne({
          where: {
            username: args.username,
            status: 1,
          },
          raw: true,
        });
      }

      if (!loginObj) {
        throw new Error("INVALID_USERNAME_OR_PASSWORD");
      }

      // Compare Encrypted password with user input password
      const valid = await bcrypt.compare(args.password, loginObj.password);

      if (!valid) {
        throw new Error("INVALID_USERNAME_OR_PASSWORD");
      }

      // Get Role Description

      const role = roleDescription(loginObj.accountType);
      console.log(APP_SECRET)
      console.log(APP_SECRET_REFRESH)

      // JWT Token for future authorization
      const token = jwt.sign(
        {
          loginId: loginObj.loginId,
          username: loginObj.username,
          roles: role,
        },
        APP_SECRET,
        {
          expiresIn: "1 days",
        }
      );

      const refreshToken = jwt.sign(
        {
          loginId: loginObj.loginId,
          username: loginObj.username,
          roles: role,
        },
        APP_SECRET_REFRESH,
        {
          expiresIn: "15 days",
        }
      );

      return {
        token,
        refreshToken,
        login: loginObj,
      };
    },
  },
};
