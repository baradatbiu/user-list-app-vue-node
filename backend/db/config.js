import dotenv from "dotenv";
dotenv.config();

const {
  PGSQL_HOST: HOST,
  PGSQL_PORT: PORT,
  PGSQL_USER: USER,
  PGSQL_PASSWORD: PASSWORD,
  PGSQL_DB: DB,
} = process.env;

export const cn = {
  host: HOST,
  port: PORT,
  database: DB,
  user: USER,
  password: PASSWORD,
};
