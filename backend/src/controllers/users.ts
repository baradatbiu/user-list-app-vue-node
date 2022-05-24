import { Response, Request } from "express";
import { db, userSql } from "../db/index.js";
import { fetchRandomUsers } from "../services/fetchRandomUsers.js";
import { memoryCache } from "../memoryCache.js";
import { UserDetails } from "types/User";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    let users = await memoryCache.wrap("users", () => db.any(userSql.getAll));

    if (!users?.length) {
      const response = await fetchRandomUsers();

      users = await db.any(userSql.fill(response));

      memoryCache.set("users", users);
    }

    res.status(200).json(users);
  } catch (error: any) {
    res.status(404).json({ error: error.message || error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const cachedUsers: UserDetails[] | undefined = await memoryCache.get(
      "users"
    );
    let user = cachedUsers?.find(({ id }) => id === userId);

    if (!user) user = await db.one(userSql.get, { id: userId });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message || error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    await db.none(userSql.delete, { id: userId });

    const cachedUsers: UserDetails[] | undefined = await memoryCache.get(
      "users"
    );

    if (cachedUsers) {
      memoryCache.set(
        "users",
        cachedUsers.filter(({ id }) => id !== userId)
      );
    }

    res.status(200).json({ status: "ok" });
  } catch (error: any) {
    res.status(404).json({ error: error.message || error });
  }
};
