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

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  extend type Mutation {\n    addBanner(\n      bannerType: String!\n      bannerUrl: String!\n      isBanner: Boolean!\n      bannerAlt: String\n    ): Boolean!\n  }\n"], ["\n  extend type Mutation {\n    addBanner(\n      bannerType: String!\n      bannerUrl: String!\n      isBanner: Boolean!\n      bannerAlt: String\n    ): Boolean!\n  }\n"]);

var _apolloServerExpress = require("apollo-server-express");

var _connectors = require("../../database/db_connector/connectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDef = exports.typeDef = (0, _apolloServerExpress.gql)(_templateObject);

var resolvers = exports.resolvers = {
  Mutation: {
    addBanner: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(root, args, context) {
        var transaction, createBanner;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connectors.db.transaction();

              case 2:
                transaction = _context.sent;
                _context.prev = 3;
                _context.next = 6;
                return _connectors.Banner.create({
                  bannerType: args.bannerType,
                  bannerUrl: args.bannerUrl,
                  isBanner: args.isBanner ? args.isBanner : false,
                  bannerAlt: args.bannerAlt ? args.bannerAlt : null
                }, {
                  transaction: transaction
                });

              case 6:
                createBanner = _context.sent;
                _context.next = 9;
                return transaction.commit();

              case 9:
                return _context.abrupt("return", true);

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](3);

                console.log("Error:", _context.t0.toString());
                _context.next = 17;
                return transaction.rollback();

              case 17:
                return _context.abrupt("return", false);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 12]]);
      }));

      function addBanner(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return addBanner;
    }()
  }
};