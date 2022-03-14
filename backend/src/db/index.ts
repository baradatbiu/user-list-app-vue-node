import pgPromise from "pg-promise";
import { cn } from "./config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { UserDetails } from "types/User";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pgp = pgPromise();

export const db = pgp(cn);

export const userSql = {
  getAll: sql("./sql/users/getAll.sql"),
  get: sql("./sql/users/get.sql"),
  delete: sql("./sql/users/delete.sql"),
  fill: insertUsersQuery,
};

function sql(file: string) {
  const fullPath = join(__dirname, file);

  return new pgp.QueryFile(fullPath, { minify: true });
}

function insertUsersQuery(values: UserDetails[]) {
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
