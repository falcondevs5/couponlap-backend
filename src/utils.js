import dotenv from "dotenv";
dotenv.config();

const { APP_SECRET } = process.env;

const APP_SECRET_REFRESH = process.env.APP_REFRESH_SECRET;


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

export { APP_SECRET, APP_SECRET_REFRESH, roleDescription };
