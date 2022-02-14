import { db, userSql } from "../db/index.js";
import { fetchRandomUsers } from "../services/fetchRandomUsers.js";
import { memoryCache } from "../memoryCache.js";

export const getUsers = async (req, res) => {
  try {
    let users = await memoryCache.wrap("users", () => db.any(userSql.getAll));

    if (!users?.length) {
      const response = await fetchRandomUsers();

      users = await db.any(userSql.fill(response));

      memoryCache.set("users", users);
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const cachedUsers = await memoryCache.get("users");
    let user = cachedUsers?.find(({ id }) => id === userId);

    if (!user) user = await db.one(userSql.get, { id: userId });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    await db.none(userSql.delete, { id: userId });

    const cachedUsers = await memoryCache.get("users");

    if (cachedUsers) {
      memoryCache.set(
        "users",
        cachedUsers.filter(({ id }) => id !== userId)
      );
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
};
