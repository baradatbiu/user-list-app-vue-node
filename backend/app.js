import express from "express";
import { fetchRandomUsers } from "./services/fetchRandomUsers.js";
import { logger } from "./logger.js";
import { memoryCache } from "./memoryCache.js";

const app = express();
const port = 5000;

app.use(logger);

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
