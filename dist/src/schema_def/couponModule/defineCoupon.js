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

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  extend type Mutation {\n    addCoupon(\n      bannerType: String!\n      bannerUrl: String\n      isBanner: Boolean\n      categoryName: String!\n      categoryType: String!\n      bannerAlt: String!\n      coverImage: String!\n      thumbImage: String!\n      merchantName: String!\n      merchantImage: String!\n      couponTitle: String\n      couponHeader: String\n      couponCode: String\n    ): Boolean!\n\n    updateCoupon(\n      couponId: Int!\n      bannerType: String!\n      bannerUrl: String\n      isBanner: Boolean\n      categoryName: String!\n      categoryType: String!\n      bannerAlt: String!\n      coverImage: String!\n      thumbImage: String!\n      merchantName: String!\n      merchantImage: String!\n      couponTitle: String\n      couponHeader: String\n      couponCode: String\n    ): Boolean!\n  }\n\n  extend type Query {\n    getCoupon(couponId: Int!): Category!\n    getAllCoupons(status: Int): [Category]!\n  }\n\n  type Coupon {\n    couponId: Int!\n    bannerId: Int!\n    bannerType: String!\n    bannerUrl: String!\n    isBanner: Boolean\n    categoryId: Int!\n    categoryName: String!\n    categoryType: String!\n    bannerAlt: String!\n    merchantId: Int!\n    coverImage: String!\n    thumbImage: String!\n    merchantName: String!\n    merchantImage: String!\n    couponTitle: String!\n    couponHeader: String!\n    couponCode: String!\n  }\n"], ["\n  extend type Mutation {\n    addCoupon(\n      bannerType: String!\n      bannerUrl: String\n      isBanner: Boolean\n      categoryName: String!\n      categoryType: String!\n      bannerAlt: String!\n      coverImage: String!\n      thumbImage: String!\n      merchantName: String!\n      merchantImage: String!\n      couponTitle: String\n      couponHeader: String\n      couponCode: String\n    ): Boolean!\n\n    updateCoupon(\n      couponId: Int!\n      bannerType: String!\n      bannerUrl: String\n      isBanner: Boolean\n      categoryName: String!\n      categoryType: String!\n      bannerAlt: String!\n      coverImage: String!\n      thumbImage: String!\n      merchantName: String!\n      merchantImage: String!\n      couponTitle: String\n      couponHeader: String\n      couponCode: String\n    ): Boolean!\n  }\n\n  extend type Query {\n    getCoupon(couponId: Int!): Category!\n    getAllCoupons(status: Int): [Category]!\n  }\n\n  type Coupon {\n    couponId: Int!\n    bannerId: Int!\n    bannerType: String!\n    bannerUrl: String!\n    isBanner: Boolean\n    categoryId: Int!\n    categoryName: String!\n    categoryType: String!\n    bannerAlt: String!\n    merchantId: Int!\n    coverImage: String!\n    thumbImage: String!\n    merchantName: String!\n    merchantImage: String!\n    couponTitle: String!\n    couponHeader: String!\n    couponCode: String!\n  }\n"]);

var _apolloServerExpress = require("apollo-server-express");

var _connectors = require("../../database/db_connector/connectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDef = exports.typeDef = (0, _apolloServerExpress.gql)(_templateObject);

var resolvers = exports.resolvers = {
  Mutation: {
    addCoupon: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(root, args, context) {
        var category, merchant, banner, transaction, currentTimestamp, categoryId, merchantId, bannerId, _category, _merchant, _banner;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connectors.Category.findOne({
                  where: {
                    categoryName: args.categoryName
                  }
                });

              case 2:
                category = _context.sent;
                _context.next = 5;
                return _connectors.Merchant.findOne({
                  where: {
                    merchantName: args.merchantName
                  }
                });

              case 5:
                merchant = _context.sent;
                _context.next = 8;
                return _connectors.Banner.findOne({
                  where: {
                    bannerType: args.bannerType
                  }
                });

              case 8:
                banner = _context.sent;
                _context.next = 11;
                return _connectors.db.transaction();

              case 11:
                transaction = _context.sent;
                currentTimestamp = Math.floor(Date.now() / 1000);
                _context.prev = 13;
                categoryId = null;
                merchantId = null;
                bannerId = null;

                if (!category) {
                  _context.next = 21;
                  break;
                }

                categoryId = category.categoryId;
                _context.next = 25;
                break;

              case 21:
                _context.next = 23;
                return _connectors.Category.create({
                  categoryName: args.categoryName,
                  categoryType: args.categoryType
                }, {
                  transaction: transaction
                });

              case 23:
                _category = _context.sent;

                categoryId = _category.categoryId;

              case 25:
                if (!merchant) {
                  _context.next = 29;
                  break;
                }

                merchantId = merchant.id;
                _context.next = 33;
                break;

              case 29:
                _context.next = 31;
                return _connectors.Merchant.create({
                  merchantName: args.merchantName,
                  merchantImage: args.merchantImage,
                  thumbImage: args.thumbImage,
                  coverImage: args.coverImage,
                  status: 1,
                  createdAt: currentTimestamp,
                  updatedAt: currentTimestamp
                }, { transaction: transaction });

              case 31:
                _merchant = _context.sent;


                merchantId = _merchant.id;

              case 33:
                if (!banner) {
                  _context.next = 37;
                  break;
                }

                bannerId = banner.bannerId;
                _context.next = 41;
                break;

              case 37:
                _context.next = 39;
                return _connectors.Banner.create({
                  bannerType: args.bannerType,
                  bannerUrl: args.bannerUrl,
                  isBanner: args.isBanner ? args.isBanner : false,
                  bannerAlt: args.bannerAlt,
                  status: 1,
                  createdAt: currentTimestamp,
                  updatedAt: currentTimestamp
                }, {
                  transaction: transaction
                });

              case 39:
                _banner = _context.sent;


                bannerId = _banner.bannerId;

              case 41:
                _context.next = 43;
                return _connectors.Coupon.create({
                  couponTitle: args.couponTitle,
                  couponHeader: args.couponHeader,
                  couponCode: args.couponCode,
                  bannerId: bannerId,
                  categoryId: categoryId,
                  merchantId: merchantId,
                  createdAt: currentTimestamp,
                  updatedAt: currentTimestamp,
                  status: 1
                }, { transaction: transaction });

              case 43:
                _context.next = 45;
                return transaction.commit();

              case 45:
                return _context.abrupt("return", true);

              case 48:
                _context.prev = 48;
                _context.t0 = _context["catch"](13);

                console.log("Error:", _context.t0.toString());
                _context.next = 53;
                return transaction.rollback();

              case 53:
                return _context.abrupt("return", false);

              case 54:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[13, 48]]);
      }));

      function addCoupon(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return addCoupon;
    }()
  }
};