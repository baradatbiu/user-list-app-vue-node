import morgan from "morgan";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const LOGS_FOLDER = "logs";
const __dirname = dirname(fileURLToPath(import.meta.url));

existsSync(LOGS_FOLDER) || mkdirSync(LOGS_FOLDER);

const accessLogStream = createWriteStream(
  join(__dirname, LOGS_FOLDER, "access.log"),
  { flags: "a" }
);

export const logger = morgan("tiny", { stream: accessLogStream });
