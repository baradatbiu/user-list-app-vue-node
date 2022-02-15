import dotenv from "dotenv";
dotenv.config();

const {
  POSTGRES_HOST: HOST,
  POSTGRES_PORT: PORT,
  POSTGRES_USER: USER,
  POSTGRES_PASSWORD: PASSWORD,
  POSTGRES_DB: DB,
} = process.env;

export const cn = {
  host: HOST,
  port: PORT,
  database: DB,
  user: USER,
  password: PASSWORD,
};
