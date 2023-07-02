import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let db;
// Connection for MySql DB 'admin_db'
if (!process.env.ADMIN_DB_NAME) {
  console.error(
    "ADMIN_DB_NAME environment variable not defined, Can`t connect to db!"
  );
} else if (!process.env.ADMIN_DB_USERNAME) {
  console.error(
    "ADMIN_DB_USERNAME environment variable not defined, Can`t connect to db!"
  );
} else if (!process.env.ADMIN_DB_PASSWORD) {
  console.error(
    "ADMIN_DB_PASSWORD environment variable not defined, Can`t connect to db!"
  );
} else if (!process.env.ADMIN_DB_PORT) {
  console.error(
    "ADMIN_DB_PORT environment variable not defined, Can`t connect to db!"
  );
} else if (!process.env.ADMIN_DB_HOST) {
  console.error(
    "ADMIN_DB_HOST environment variable not defined, Can`t connect to db!"
  );
} else if (!process.env.ADMIN_DB_TYPE) {
  console.error(
    "ADMIN_DB_TYPE environment variable not defined, Can`t connect to db!"
  );
} else {
  // console.log(process.env.ADMIN_DB_NAME, process.env.ADMIN_DB_USERNAME, process.env.ADMIN_DB_PASSWORD, process.env.ADMIN_DB_HOST, process.env.ADMIN_DB_TYPE, process.env.ADMIN_DB_PORT);

  db = new Sequelize(
    process.env.ADMIN_DB_NAME,
    process.env.ADMIN_DB_USERNAME,
    process.env.ADMIN_DB_PASSWORD,
    {
      host: process.env.ADMIN_DB_HOST,
      port: process.env.ADMIN_DB_PORT,
      dialect: process.env.ADMIN_DB_TYPE,
      logging: false,
      dialectOptions: {
        insecureAuth: true,
      },
      define: {
        timestamps: false,
      },
      pool: {
        max: 30,
        min: 0,
        idle: 20000,
        acquire: 60000,
        evict: 20000,
      },
    }
  );

  // DB connection authentication
  db.authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

const { Op } = Sequelize;
const { Query } = Sequelize;

const loginModel = db.import(`${__dirname}/../loginmodels/loginmodel.js`);
const categoryModel = db.import(
  `${__dirname}/../categorymodels/categoryModel.js`
);
const bannerModel = db.import(`${__dirname}/..//bannerModels/bannerModel.js`);
const merchantModel = db.import(
  `${__dirname}/../merchantModels/merchantModel.js`
);
const couponModel = db.import(`${__dirname}/../couponModels/couponModel.js`);

couponModel.belongsTo(merchantModel, {
  as: "AssociatedMerchant",
  targetKey: "id",
  foreignKey: "merchantId",
});

merchantModel.hasMany(couponModel, {
  as: "AssociatedMerchants",
  sourceKey: "id",
  foreignKey: "merchantId",
});

couponModel.belongsTo(bannerModel,{
  as: "AssociatedBanner",
  targetKey: "bannerId",
  foreignKey: "bannerId",
});

bannerModel.hasMany(couponModel, {
  as: "AssociatedBanners",
  sourceKey: "bannerId",
  foreignKey: "bannerId",
});

couponModel.belongsTo(categoryModel,{
  as: "AssociatedCategory",
  targetKey: "categoryId",
  foreignKey: "categoryId",
})


categoryModel.hasMany(couponModel,{
  as: "AssociatedCategories",
  sourceKey: "categoryId",
  foreignKey: "categoryId",
})

// Sync DB with all defined models
db.sync();

// Create Database Table Model Object
const Login = db.models.login;
const Category = db.models.categories;
const Banner = db.models.banners;
const Merchant = db.models.merchant;
const Coupon = db.models.coupons;

export { db, Op, Query, Login, Category, Banner, Coupon, Merchant };
