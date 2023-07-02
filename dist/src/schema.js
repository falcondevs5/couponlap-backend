'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESOLVERS = exports.TYPEDEFS = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  scalar JSON\n\n  type Query {\n    _empty: String\n  }\n  type Mutation {\n    _emptyMutation: String\n  }\n'], ['\n  scalar JSON\n\n  type Query {\n    _empty: String\n  }\n  type Mutation {\n    _emptyMutation: String\n  }\n']);

var _lodash = require('lodash');

var _apolloServerExpress = require('apollo-server-express');

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _loginCreation = require('./schema_def/loginModule/loginCreation');

var _defineCategory = require('./schema_def/categoryModule/defineCategory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default Query Mutation Initialization
var Query = (0, _apolloServerExpress.gql)(_templateObject);

var resolvers = {
  JSON: _graphqlTypeJson2.default
};

var TYPEDEFS = [Query, _loginCreation.typeDef, _defineCategory.typeDef];

var RESOLVERS = (0, _lodash.merge)(resolvers, _loginCreation.resolvers, _defineCategory.resolvers);

exports.TYPEDEFS = TYPEDEFS;
exports.RESOLVERS = RESOLVERS;