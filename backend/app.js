import express from "express";
import cacheManager from "cache-manager";
import { fetchRandomUsers } from "./services/fetchRandomUsers.js";

const app = express();
const port = 5000;
const memoryCache = cacheManager.caching({
  store: "memory",
  max: 10000,
  ttl: 3600,
});

app.get("/api/users", async (req, res) => {
  try {
    const response = await memoryCache.wrap("api-users", fetchRandomUsers);

    res.append("Access-Control-Allow-Origin", "*");
    res.status(200).json(response);
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
