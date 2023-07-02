export default function (sequelize, DataTypes) {
    return sequelize.define(
      'login',
      {
        loginId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(32),
          allowNull: false,
          unique: true,
          validate: {
            len: {
              args: [5, 32],
              msg: 'Username should be in 5-32 character range!',
            },
            notEmpty: {
              msg: 'Username should not be empty string!',
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Password should not be empty string!',
            },
          },
        },
        accountType: {
          type: DataTypes.STRING(32),
          allowNull: false,
          validate: {
            len: {
              args: [2, 15],
              msg: 'Account type should be in 2-15 character range!',
            },
            notEmpty: {
              msg: 'Accoount type should not be empty string!',
            },
          },
        },
        createdAt: {
          type: DataTypes.BIGINT(11),
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.BIGINT(11),
          allowNull: false,
        },
        lastLoginTime: {
          type: DataTypes.BIGINT(11),
          allowNull: true,
        },
        status: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: '1',
        },
      },
      {
        indexes: [
          {
            name: 'createdAt',
            unique: false,
            fields: ['createdAt'],
          },
          {
            name: 'updatedAt',
            unique: false,
            fields: ['updatedAt'],
          },
        ],
        timestamps: false,
      }
    );
  }
  