import { fetchRandomUsers } from "../services/fetchRandomUsers.js";
import { memoryCache } from "../memoryCache.js";

export const getUsers = async (req, res) => {
  try {
    const response = await memoryCache.wrap("users", fetchRandomUsers);

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json(response);
  } catch (error) {
    res.status(503).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await memoryCache.get("users");

    const user = users.find(({ id }) => id === req.params.id);

    if (!user) throw new Error("User not found");

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json(user);
  } catch (error) {
    res.status(503).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const users = await memoryCache.get("users");

    if (!users) throw new Error("User not found");

    const updatedUsers = users.filter(({ id }) => id !== req.params.id);

    await memoryCache.set("users", updatedUsers);

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(503).json(error);
  }
};
