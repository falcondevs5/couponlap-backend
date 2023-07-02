"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roleDescription = exports.APP_SECRET_REFRESH = exports.APP_SECRET = undefined;

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var APP_SECRET = process.env.APP_SECRET;


var APP_SECRET_REFRESH = process.env.APP_REFRESH_SECRET;

function roleDescription(accountType) {
  switch (accountType) {
    case "ACC":
      return "ACCOUNT";
    case "SA":
      return "SUPERADMIN";
    case "PA":
      return "BUSINESSADMIN";
    case "RES":
      return "RESELLERADMIN";
    case "CLT":
      return "CLIENT";
    default:
      return "WRONGACCOUNT";
  }
}

exports.APP_SECRET = APP_SECRET;
exports.APP_SECRET_REFRESH = APP_SECRET_REFRESH;
exports.roleDescription = roleDescription;