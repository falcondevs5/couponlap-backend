"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDef = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  extend type Query {\n    login(\n      username: String!\n      password: String!\n      accountType: String\n    ): AuthPayload\n  }\n\n  type Login {\n    loginId: Int!\n    username: String!\n    accountType: String!\n    status: Int!\n    lastLoginTime: String\n  }\n\n  \"\"\"\n  Response type for login API\n  \"\"\"\n  type AuthPayload {\n    \"\"\"\n    Token generated for the login. Expire time is pre defined.\n    \"\"\"\n    token: String\n    \"\"\"\n    Refresh token generated for the login. Expire time is greater than normal token.\n    \"\"\"\n    refreshToken: String\n    \"\"\"\n    Login object.\n    \"\"\"\n    login: Login\n  }\n"], ["\n  extend type Query {\n    login(\n      username: String!\n      password: String!\n      accountType: String\n    ): AuthPayload\n  }\n\n  type Login {\n    loginId: Int!\n    username: String!\n    accountType: String!\n    status: Int!\n    lastLoginTime: String\n  }\n\n  \"\"\"\n  Response type for login API\n  \"\"\"\n  type AuthPayload {\n    \"\"\"\n    Token generated for the login. Expire time is pre defined.\n    \"\"\"\n    token: String\n    \"\"\"\n    Refresh token generated for the login. Expire time is greater than normal token.\n    \"\"\"\n    refreshToken: String\n    \"\"\"\n    Login object.\n    \"\"\"\n    login: Login\n  }\n"]);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _each = require("async/each");

var _each2 = _interopRequireDefault(_each);

var _graphqlRequest = require("graphql-request");

var _apolloServerExpress = require("apollo-server-express");

var _utils = require("../../utils");

var _connectors = require("../../database/db_connector/connectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require("axios");
var typeDef = exports.typeDef = (0, _apolloServerExpress.gql)(_templateObject);

var resolvers = exports.resolvers = {
  Query: {
    login: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(root, args, context) {
        var accountType, loginObj, loginDeactive, valid, role, token, refreshToken;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                accountType = args.accountType;
                loginObj = {};
                _context.next = 4;
                return _connectors.Login.findOne({
                  where: {
                    username: args.username
                  },
                  raw: true
                });

              case 4:
                loginDeactive = _context.sent;

                if (!loginDeactive) {
                  _context.next = 8;
                  break;
                }

                if (!(loginDeactive.status === 0)) {
                  _context.next = 8;
                  break;
                }

                throw new Error("Account is Deactivated");

              case 8:
                if (!accountType) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return _connectors.Login.findOne({
                  where: {
                    username: args.username,
                    accountType: accountType,
                    status: 1
                  },
                  raw: true
                });

              case 11:
                loginObj = _context.sent;
                _context.next = 17;
                break;

              case 14:
                _context.next = 16;
                return _connectors.Login.findOne({
                  where: {
                    username: args.username,
                    status: 1
                  },
                  raw: true
                });

              case 16:
                loginObj = _context.sent;

              case 17:
                if (loginObj) {
                  _context.next = 19;
                  break;
                }

                throw new Error("INVALID_USERNAME_OR_PASSWORD");

              case 19:
                _context.next = 21;
                return _bcryptjs2.default.compare(args.password, loginObj.password);

              case 21:
                valid = _context.sent;

                if (valid) {
                  _context.next = 24;
                  break;
                }

                throw new Error("INVALID_USERNAME_OR_PASSWORD");

              case 24:

                // Get Role Description

                role = (0, _utils.roleDescription)(loginObj.accountType);

                console.log(_utils.APP_SECRET);
                console.log(_utils.APP_SECRET_REFRESH);

                // JWT Token for future authorization
                token = _jsonwebtoken2.default.sign({
                  loginId: loginObj.loginId,
                  username: loginObj.username,
                  roles: role
                }, _utils.APP_SECRET, {
                  expiresIn: "1 days"
                });
                refreshToken = _jsonwebtoken2.default.sign({
                  loginId: loginObj.loginId,
                  username: loginObj.username,
                  roles: role
                }, _utils.APP_SECRET_REFRESH, {
                  expiresIn: "15 days"
                });
                return _context.abrupt("return", {
                  token: token,
                  refreshToken: refreshToken,
                  login: loginObj
                });

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return login;
    }()
  }
};