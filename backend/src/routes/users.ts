import express from "express";
import { deleteUser, getUser, getUsers } from "../controllers/users.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser).delete(deleteUser);

export { router as users };
