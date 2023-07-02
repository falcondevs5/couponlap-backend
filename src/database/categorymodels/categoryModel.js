export default function (sequelize, DataTypes) {
  return sequelize.define(
    "categories",
    {
      categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryName: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      categoryType: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: "1",
      },
    },
    {
      indexes: [
        {
          name: "createdAt",
          unique: false,
          fields: ["createdAt"],
        },
        {
          name: "updatedAt",
          unique: false,
          fields: ["updatedAt"],
        },
      ],
      tableName: "categories",
      timestamps: false,
    }
  );
}
