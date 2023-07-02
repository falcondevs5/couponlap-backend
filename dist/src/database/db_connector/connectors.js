"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Merchant = exports.Coupon = exports.Banner = exports.Category = exports.Login = exports.Query = exports.Op = exports.db = undefined;

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var db = void 0;
// Connection for MySql DB 'admin_db'
if (!process.env.ADMIN_DB_NAME) {
  console.error("ADMIN_DB_NAME environment variable not defined, Can`t connect to db!");
} else if (!process.env.ADMIN_DB_USERNAME) {
  console.error("ADMIN_DB_USERNAME environment variable not defined, Can`t connect to db!");
} else if (!process.env.ADMIN_DB_PASSWORD) {
  console.error("ADMIN_DB_PASSWORD environment variable not defined, Can`t connect to db!");
} else if (!process.env.ADMIN_DB_PORT) {
  console.error("ADMIN_DB_PORT environment variable not defined, Can`t connect to db!");
} else if (!process.env.ADMIN_DB_HOST) {
  console.error("ADMIN_DB_HOST environment variable not defined, Can`t connect to db!");
} else if (!process.env.ADMIN_DB_TYPE) {
  console.error("ADMIN_DB_TYPE environment variable not defined, Can`t connect to db!");
} else {
  // console.log(process.env.ADMIN_DB_NAME, process.env.ADMIN_DB_USERNAME, process.env.ADMIN_DB_PASSWORD, process.env.ADMIN_DB_HOST, process.env.ADMIN_DB_TYPE, process.env.ADMIN_DB_PORT);

  exports.db = db = new _sequelize2.default(process.env.ADMIN_DB_NAME, process.env.ADMIN_DB_USERNAME, process.env.ADMIN_DB_PASSWORD, {
    host: process.env.ADMIN_DB_HOST,
    port: process.env.ADMIN_DB_PORT,
    dialect: process.env.ADMIN_DB_TYPE,
    logging: false,
    dialectOptions: {
      insecureAuth: true
    },
    define: {
      timestamps: false
    },
    pool: {
      max: 30,
      min: 0,
      idle: 20000,
      acquire: 60000,
      evict: 20000
    }
  });

  // DB connection authentication
  db.authenticate().then(function () {
    console.log("Connection has been established successfully.");
  }).catch(function (err) {
    console.error("Unable to connect to the database:", err);
  });
}

var Op = _sequelize2.default.Op;
var Query = _sequelize2.default.Query;


var loginModel = db.import(__dirname + "/../loginmodels/loginmodel.js");
var categoryModel = db.import(__dirname + "/../categorymodels/categoryModel.js");
var bannerModel = db.import(__dirname + "/..//bannerModels/bannerModel.js");
var merchantModel = db.import(__dirname + "/../merchantModels/merchantModel.js");
var couponModel = db.import(__dirname + "/../couponModels/couponModel.js");

couponModel.belongsTo(merchantModel, {
  as: "AssociatedMerchant",
  targetKey: "id",
  foreignKey: "merchantId"
});

merchantModel.hasMany(couponModel, {
  as: "AssociatedMerchants",
  sourceKey: "id",
  foreignKey: "merchantId"
});

couponModel.belongsTo(bannerModel, {
  as: "AssociatedBanner",
  targetKey: "bannerId",
  foreignKey: "bannerId"
});

bannerModel.hasMany(couponModel, {
  as: "AssociatedBanners",
  sourceKey: "bannerId",
  foreignKey: "bannerId"
});

couponModel.belongsTo(categoryModel, {
  as: "AssociatedCategory",
  targetKey: "categoryId",
  foreignKey: "categoryId"
});

categoryModel.hasMany(couponModel, {
  as: "AssociatedCategories",
  sourceKey: "categoryId",
  foreignKey: "categoryId"
});

// Sync DB with all defined models
db.sync();

// Create Database Table Model Object
var Login = db.models.login;
var Category = db.models.categories;
var Banner = db.models.banners;
var Merchant = db.models.merchant;
var Coupon = db.models.coupons;

exports.db = db;
exports.Op = Op;
exports.Query = Query;
exports.Login = Login;
exports.Category = Category;
exports.Banner = Banner;
exports.Coupon = Coupon;
exports.Merchant = Merchant;