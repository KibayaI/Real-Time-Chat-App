import { Router } from "express";
import {users} from "../controllers/userController.mjs"

export const router = Router();

router.route("/").post(users.addUser);
router.route("/users").get(users.getUsers);

