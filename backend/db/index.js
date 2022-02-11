import pgPromise from "pg-promise";
import { cn } from "./config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pgp = pgPromise();

export const db = pgp(cn);

export const userSql = {
  create: sql("./sql/users/create.sql"),
  getAll: sql("./sql/users/getAll.sql"),
  get: sql("./sql/users/get.sql"),
  delete: sql("./sql/users/delete.sql"),
  init: insertUsersQuery,
};

function sql(file) {
  const fullPath = join(__dirname, file);

  return new pgp.QueryFile(fullPath, { minify: true });
}

function insertUsersQuery(values) {
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

  return pgp.helpers.insert(values, userColumns) + "RETURNING *";
}
