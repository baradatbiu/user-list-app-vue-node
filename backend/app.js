import express from "express";
import { fetchRandomUsers } from "./services/fetchRandomUsers.js";
const app = express();
const port = 5000;

app.get("/api/users", async (req, res) => {
  try {
    const response = await fetchRandomUsers();

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
