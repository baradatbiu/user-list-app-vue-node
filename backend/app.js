import express from "express";
import { fetchRandomUsers } from "./services/fetchRandomUsers.js";
import { logger } from "./logger.js";
import { memoryCache } from "./memoryCache.js";

const app = express();
const port = 5000;

app.use(logger);

app.get("/api/users", async (req, res) => {
  try {
    const response = await memoryCache.wrap("users", fetchRandomUsers);

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json(response);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const users = await memoryCache.get("users");

    const user = users.find(({ id }) => id === req.params.id);

    if (!user) throw new Error("User not found");

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json(user);
  } catch (error) {
    res.status(503).json(error);
  }
});

app.delete("/api/users/:id", async (req, res) => {
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
});

app.all("*", (req, res) => {
  res.status(404).send("fuck off");
});

app.listen(port, (req, res) => {
  console.log("listen");
});
