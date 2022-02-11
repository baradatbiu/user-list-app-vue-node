import { db, getUsersInsertQuery } from "../db/index.js";
import { fetchRandomUsers } from "../services/fetchRandomUsers.js";
import { memoryCache } from "../memoryCache.js";

export const getUsers = async (req, res) => {
  try {
    let users = await memoryCache.wrap("users", () =>
      db.any("SELECT * FROM users")
    );

    if (!users?.length) {
      const response = await fetchRandomUsers();

      const query = getUsersInsertQuery(response);

      users = await db.any(query);

      memoryCache.set("users", users);
    }

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const cachedUsers = await memoryCache.get("users");
    let user = cachedUsers?.find(({ id }) => id === req.params.id);

    if (!user) {
      user = await db.one("SELECT * FROM users WHERE id = $1", id);
    }

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await db.any("DELETE FROM users WHERE id = $1", id);

    const cachedUsers = await memoryCache.get("users");
    await memoryCache.set(
      "users",
      cachedUsers.filter(({ id: userId }) => userId !== id)
    );

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
};
