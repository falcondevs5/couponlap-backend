import { gql } from "apollo-server-express";

import {
  Op,
  db,
  Banner,
  Category,
  Coupon,
  Merchant,
} from "../../database/db_connector/connectors";

export const typeDef = gql`
  extend type Mutation {
    addCoupon(
      bannerType: String!
      bannerUrl: String
      isBanner: Boolean
      categoryName: String!
      categoryType: String!
      bannerAlt: String!
      coverImage: String!
      thumbImage: String!
      merchantName: String!
      merchantImage: String!
      couponTitle: String
      couponHeader: String
      couponCode: String
    ): Boolean!

    updateCoupon(
      couponId: Int!
      bannerType: String!
      bannerUrl: String
      isBanner: Boolean
      categoryName: String!
      categoryType: String!
      bannerAlt: String!
      coverImage: String!
      thumbImage: String!
      merchantName: String!
      merchantImage: String!
      couponTitle: String
      couponHeader: String
      couponCode: String
    ): Boolean!

    deactivateCoupon(couponId: Int!): Boolean!
  }

  extend type Query {
    getCoupon(couponId: Int!): Coupon!
    getAllCoupons(status: Int): [Coupon]!
  }

  type Coupon {
    couponId: Int!
    bannerId: Int!
    bannerType: String!
    bannerUrl: String!
    isBanner: Boolean
    categoryId: Int!
    categoryName: String!
    categoryType: String!
    bannerAlt: String!
    merchantId: Int!
    coverImage: String!
    thumbImage: String!
    merchantName: String!
    merchantImage: String!
    couponTitle: String!
    couponHeader: String!
    couponCode: String!
  }
`;

export const resolvers = {
  Query: {
    async getCoupon(root, args, context) {
      if (!args.couponId) {
        throw new Error("Please provide a couponId");
      }

      // Coupon
      let couponDetails = await Coupon.findOne({
        include: [
          {
            model: Category,
            required: true,
            nested: true,
            as: "AssociatedCategory",
          },
          {
            model: Banner,
            required: true,
            nested: true,
            as: "AssociatedBanner",
          },
          {
            model: Merchant,
            required: true,
            nested: true,
            as: "AssociatedMerchant",
          },
        ],
        where: {
          id: args.couponId,
        },
      });


      if (couponDetails) {
        let obj = {};
        obj.couponId = couponDetails.id;
        obj.couponTitle = couponDetails.couponTitle;
        obj.couponHeader = couponDetails.couponHeader;
        obj.couponCode = couponDetails.couponCode;

        if (couponDetails.AssociatedCategory) {
          obj.categoryId = couponDetails.AssociatedCategory.categoryId;
          obj.categoryName = couponDetails.AssociatedCategory.categoryName;
          obj.categoryType = couponDetails.AssociatedCategory.categoryType;
        }

        if (couponDetails.AssociatedBanner) {
          obj.bannerId = couponDetails.AssociatedBanner.bannerId;
          obj.bannerType = couponDetails.AssociatedBanner.bannerType;
          obj.bannerUrl = couponDetails.AssociatedBanner.bannerUrl;
          obj.isBanner =
            couponDetails.AssociatedBanner.isBanner === 1 ? true : false;
          obj.bannerAlt = couponDetails.AssociatedBanner.bannerAlt;
        }

        if (couponDetails.AssociatedMerchant) {
          obj.merchantId = couponDetails.AssociatedMerchant.id;
          obj.merchantName = couponDetails.AssociatedMerchant.merchantName;
          obj.merchantImage = couponDetails.AssociatedMerchant.merchantImage;
          obj.thumbImage = couponDetails.AssociatedMerchant.thumbImage;
          obj.coverImage = couponDetails.AssociatedMerchant.coverImage;
        }
        obj.createdAt = couponDetails.createdAt;
        obj.updatedAt = couponDetails.updatedAt;

        return obj;
      } else {
        return null;
      }
    },
    async getAllCoupons(root, args, context) {

      let where = {};
      where.status = 1;
      // Coupon
      let couponDetails = await Coupon.findAll({
        include: [
          {
            model: Category,
            required: true,
            nested: true,
            as: "AssociatedCategory",
          },
          {
            model: Banner,
            required: true,
            nested: true,
            as: "AssociatedBanner",
          },
          {
            model: Merchant,
            required: true,
            nested: true,
            as: "AssociatedMerchant",
          },
        ],
        where: where,
      });

      let finalResponse = [];
      if (couponDetails.length > 0) {
        for (let i = 0; i < couponDetails.length; i++) {
          let obj = {};
          let couponDetail = couponDetails[i].dataValues;
          obj.couponId = couponDetail.id;
          obj.couponTitle = couponDetail.couponTitle;
          obj.couponHeader = couponDetail.couponHeader;
          obj.couponCode = couponDetail.couponCode;

          if (couponDetail.AssociatedCategory) {
            obj.categoryId = couponDetail.AssociatedCategory.categoryId;
            obj.categoryName = couponDetail.AssociatedCategory.categoryName;
            obj.categoryType = couponDetail.AssociatedCategory.categoryType;
          }

          if (couponDetail.AssociatedBanner) {
            obj.bannerId = couponDetail.AssociatedBanner.bannerId;
            obj.bannerType = couponDetail.AssociatedBanner.bannerType;
            obj.bannerUrl = couponDetail.AssociatedBanner.bannerUrl;
            obj.isBanner =
              couponDetail.AssociatedBanner.isBanner === 1 ? true : false;
            obj.bannerAlt = couponDetail.AssociatedBanner.bannerAlt;
          }

          if (couponDetail.AssociatedMerchant) {
            obj.merchantId = couponDetail.AssociatedMerchant.id;
            obj.merchantName = couponDetail.AssociatedMerchant.merchantName;
            obj.merchantImage = couponDetail.AssociatedMerchant.merchantImage;
            obj.thumbImage = couponDetail.AssociatedMerchant.thumbImage;
            obj.coverImage = couponDetail.AssociatedMerchant.coverImage;
          }
          obj.createdAt = couponDetail.createdAt;
          obj.updatedAt = couponDetail.updatedAt;
          finalResponse.push(obj);
        }

        return finalResponse;
      } else {
        return [];
      }
    },
  },
  Mutation: {
    async addCoupon(root, args, context) {
      let category = await Category.findOne({
        where: {
          categoryName: args.categoryName,
        },
      });

      let merchant = await Merchant.findOne({
        where: {
          merchantName: args.merchantName,
        },
      });

      let banner = await Banner.findOne({
        where: {
          bannerType: args.bannerType,
        },
      });

      let transaction = await db.transaction();
      let currentTimestamp = Math.floor(Date.now() / 1000);

      try {
        let categoryId = null;
        let merchantId = null;
        let bannerId = null;

        if (category) {
          categoryId = category.categoryId;
        } else {
          let category = await Category.create(
            {
              categoryName: args.categoryName,
              categoryType: args.categoryType,
              createdAt: currentTimestamp,
              updatedAt: currentTimestamp,
              status: 1,
            },
            {
              transaction,
            }
          );
          categoryId = category.categoryId;
        }

        if (merchant) {
          merchantId = merchant.id;
        } else {
          let merchant = await Merchant.create(
            {
              merchantName: args.merchantName,
              merchantImage: args.merchantImage,
              thumbImage: args.thumbImage,
              coverImage: args.coverImage,
              status: 1,
              createdAt: currentTimestamp,
              updatedAt: currentTimestamp,
            },
            { transaction }
          );

          merchantId = merchant.id;
        }

        if (banner) {
          bannerId = banner.bannerId;
        } else {
          let banner = await Banner.create(
            {
              bannerType: args.bannerType,
              bannerUrl: args.bannerUrl,
              isBanner: args.isBanner ? args.isBanner : false,
              bannerAlt: args.bannerAlt,
              status: 1,
              createdAt: currentTimestamp,
              updatedAt: currentTimestamp,
            },
            {
              transaction,
            }
          );

          bannerId = banner.bannerId;
        }

        await Coupon.create(
          {
            couponTitle: args.couponTitle,
            couponHeader: args.couponHeader,
            couponCode: args.couponCode,
            bannerId: bannerId,
            categoryId: categoryId,
            merchantId: merchantId,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            status: 1,
          },
          { transaction }
        );

        await transaction.commit();
        return true;
      } catch (err) {
        console.log("Error:", err.toString());
        await transaction.rollback();
        return false;
      }
    },

    async updateCoupon(root, args, context) {
      let coupon = await Coupon.findOne({
        where: {
          id: args.couponId,
        },
      });

      if (!coupon) {
        throw new Error("Coupon not found");
      }

      let currentTimestamp = Math.floor(Date.now() / 1000);
      let transaction = await db.transaction();

      try {
        await Coupon.update(
          {
            couponTitle: args.couponTitle,
            couponHeader: args.couponHeader,
            couponCode: args.couponCode,
            updatedAt: currentTimestamp,
            status: 1,
          },
          {
            where: {
              id: args.couponId,
            },
            transaction,
          }
        );

        let banner = await Banner.update(
          {
            bannerType: args.bannerType,
            bannerUrl: args.bannerUrl,
            isBanner: args.isBanner ? args.isBanner : false,
            bannerAlt: args.bannerAlt,
            updatedAt: currentTimestamp,
          },
          {
            where: {
              bannerId: coupon.bannerId,
            },
            transaction,
          }
        );

        let merchant = await Merchant.update(
          {
            merchantName: args.merchantName,
            merchantImage: args.merchantImage,
            thumbImage: args.thumbImage,
            coverImage: args.coverImage,
            updatedAt: currentTimestamp,
          },
          {
            where: {
              id: coupon.merchantId,
            },
            transaction,
          }
        );

        let category = await Category.update(
          {
            categoryName: args.categoryName,
            categoryType: args.categoryType,
            updatedAt: currentTimestamp,
          },
          {
            where: {
              categoryId: coupon.categoryId,
            },
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

    async deactivateCoupon(root, args, context) {
      let coupon = await Coupon.findOne({
        where: {
          id: args.couponId,
        },
      });

      if (!coupon) {
        throw new Error("Coupon not found");
      }

      if (coupon.status === 0) {
        throw new Error("Coupon already deactivated");
      }

      let currentTimestamp = Math.floor(Date.now() / 1000);

      let transaction = await db.transaction();

      try {
        await Coupon.update(
          {
            status: 0,
          },
          {
            where: {
              id: args.couponId,
            },
            transaction,
          }
        );

        await transaction.commit();
        return true;
      } catch (err) {
        await transaction.rollback();
        console.log("Eror:", err.toString());
        return false;
      }
    },
  },
};
