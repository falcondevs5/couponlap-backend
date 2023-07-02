"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define("banners", {
    bannerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bannerType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bannerUrl: {
      type: DataTypes.TEXT("long"),
      allowNull: true
    },
    isBanner: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "false"
    },
    bannerAlt: {
      type: DataTypes.STRING(255),
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
    tableName: "banners",
    timestamps: false
  });
};