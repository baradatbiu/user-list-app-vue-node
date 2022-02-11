import pgPromise from "pg-promise";
import { cn } from "./config.js";

const pgp = pgPromise();

export const db = pgp(cn);

const userFields = [
  "fullname",
  "email",
  "login",
  "phone",
  "picture",
  "age",
  "address",
  "password",
  "rating",
];

const userColumns = new pgp.helpers.ColumnSet(userFields, { table: "users" });

export const getUsersInsertQuery = (values) => {
  return pgp.helpers.insert(values, userColumns) + "RETURNING *";
};
