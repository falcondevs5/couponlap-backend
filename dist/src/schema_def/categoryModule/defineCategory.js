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

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  extend type Query {\n    getAllCategories(catgoryId: Int): [Category]!\n  }\n\n  extend type Mutation {\n    addCategory(categoryName: String!, categoryType: String): Boolean!\n  }\n\n  type Category {\n    categoryId: Int!\n    categoryName: String!\n    categoryType: String\n    createdAt: String!\n    updatedAt: String!\n    status: Int!\n  }\n"], ["\n  extend type Query {\n    getAllCategories(catgoryId: Int): [Category]!\n  }\n\n  extend type Mutation {\n    addCategory(categoryName: String!, categoryType: String): Boolean!\n  }\n\n  type Category {\n    categoryId: Int!\n    categoryName: String!\n    categoryType: String\n    createdAt: String!\n    updatedAt: String!\n    status: Int!\n  }\n"]);

var _apolloServerExpress = require("apollo-server-express");

var _connectors = require("../../database/db_connector/connectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDef = exports.typeDef = (0, _apolloServerExpress.gql)(_templateObject);

var resolvers = exports.resolvers = {
  Query: {
    getAllCategories: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(root, args, context) {
        var categoryDetails, _categoryDetails;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!args.categoryId) {
                  _context.next = 11;
                  break;
                }

                _context.next = 3;
                return _connectors.Category.findAll({
                  where: {
                    categoryId: args.categoryId
                  }
                });

              case 3:
                categoryDetails = _context.sent;

                if (!categoryDetails) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", categoryDetails);

              case 8:
                return _context.abrupt("return", []);

              case 9:
                _context.next = 19;
                break;

              case 11:
                _context.next = 13;
                return _connectors.Category.findAll({});

              case 13:
                _categoryDetails = _context.sent;

                if (!_categoryDetails) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", _categoryDetails);

              case 18:
                return _context.abrupt("return", []);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAllCategories(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return getAllCategories;
    }()
  },

  Mutation: {
    addCategory: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(root, args, context) {
        var category, currentTimestamp, transaction, categoryDetails;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _connectors.Category.findOne({
                  where: {
                    categoryName: args.categoryName
                  }
                });

              case 2:
                category = _context2.sent;

                if (!category) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("Category Name already exists!!!!!!!!");

              case 5:
                currentTimestamp = Math.floor(Date.now() / 1000);
                _context2.next = 8;
                return _connectors.db.transaction();

              case 8:
                transaction = _context2.sent;
                _context2.prev = 9;
                _context2.next = 12;
                return _connectors.Category.create({
                  categoryName: args.categoryName,
                  categoryType: args.categoryType ? args.categoryType : null,
                  createdAt: currentTimestamp,
                  updatedAt: currentTimestamp,
                  status: 1
                }, {
                  transaction: transaction
                });

              case 12:
                categoryDetails = _context2.sent;
                _context2.next = 15;
                return transaction.commit();

              case 15:
                return _context2.abrupt("return", true);

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](9);
                _context2.next = 22;
                return transaction.rollback();

              case 22:
                console.log("Error:", _context2.t0.toString());

                return _context2.abrupt("return", false);

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[9, 18]]);
      }));

      function addCategory(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return addCategory;
    }()
  }
};