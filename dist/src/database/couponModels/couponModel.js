"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define("coupons", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    couponTitle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    couponHeader: {
      type: DataTypes.TEXT("long"),
      allowNull: true
    },
    couponCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bannerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    merchantId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.BIGINT(11),
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.BIGINT(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "1"
    }
  }, {
    indexes: [{
      name: "createdAt",
      unique: false,
      fields: ["createdAt"]
    }, {
      name: "updatedAt",
      unique: false,
      fields: ["updatedAt"]
    }],
    tableName: "coupons",
    timestamps: false
  });
};