import morgan from "morgan";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const LOGS_FOLDER = "logs";
const __dirname = dirname(fileURLToPath(import.meta.url));
const folderPath = join(__dirname, LOGS_FOLDER);

existsSync(folderPath) || mkdirSync(folderPath);

const accessLogStream = createWriteStream(join(folderPath, "access.log"), {
  flags: "a",
});

export const logger = morgan("tiny", { stream: accessLogStream });
