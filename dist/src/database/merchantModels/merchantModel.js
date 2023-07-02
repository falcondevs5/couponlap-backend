"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define("merchant", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    merchantName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    merchantImage: {
      type: DataTypes.TEXT("long"),
      allowNull: true
    },
    thumbImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coverImage: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: "merchant",
    timestamps: false
  });
};