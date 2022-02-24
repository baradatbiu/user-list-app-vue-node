import express from "express";
import { logger } from "./logger.js";
import { users } from "./routes/users.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(logger);
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});
app.use("/api/users", users);

app.all("*", (req, res) => {
  res.status(404).send("fuck off");
});

try {
  app.listen(port, () => console.log(`listening on port: ${port}`));
} catch (err) {
  console.error(err);
  process.exit(1);
}
