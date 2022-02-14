import pgPromise from "pg-promise";
import { cn } from "./config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pgp = pgPromise();

export const db = pgp(cn);

export const userSql = {
  getAll: sql("./sql/users/getAll.sql"),
  get: sql("./sql/users/get.sql"),
  delete: sql("./sql/users/delete.sql"),
  fill: insertUsersQuery,
};

export const dbInit = async () => {
  try {
    await db.none(sql("./sql/users/create.sql"));
  } catch (error) {
    console.log(error.message || error);
  }
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
