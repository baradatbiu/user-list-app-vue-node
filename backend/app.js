import express from "express";
import { dbInit } from "./db/index.js";
import { logger } from "./logger.js";
import { users } from "./routes/users.js";

const app = express();
const port = 5000;

app.use(logger);
app.use(express.json());
app.use("/api/users", users);

app.all("*", (req, res) => {
  res.status(404).send("fuck off");
});

try {
  await dbInit();

  app.listen(port, () => console.log("listening"));
} catch (err) {
  console.error(err);
  process.exit(1);
}
