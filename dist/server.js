'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _schema = require('./src/schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: Rahul Kallur
 * @Date: 2023-05-26 19:30:14
 */
_dotenv2.default.config();

// GraphQL Port
var GRAPHQL_PORT = process.env.SERVER_PORT;

// GraphQL Server Initialization
var app = (0, _express2.default)();

// End Point Configuration
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.TYPEDEFS,
  resolvers: _schema.RESOLVERS,
  context: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
      var req = _ref.req;
      var reqObj;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(req && req.headers)) {
                _context.next = 3;
                break;
              }

              reqObj = req.headers;
              return _context.abrupt('return', reqObj);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function context(_x) {
      return _ref2.apply(this, arguments);
    }

    return context;
  }(),
  // Format Error
  formatError: function formatError(error) {
    console.error(JSON.stringify(error));
    // console.error(JSON.stringify(error.message));
    throw {
      message: error.message
    };
  }
});

server.applyMiddleware({
  app: app,
  bodyParserConfig: {
    extended: true,
    limit: '50mb'
  }
});

var appServer = app.listen(GRAPHQL_PORT, function () {
  return console.log('\uD83D\uDE80 Playground is now running on http://localhost:' + GRAPHQL_PORT + '/graphql');
});

appServer.timeout = 2400000;