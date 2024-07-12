import { Router } from "express";
import { users } from "../controllers/userController.mjs";

export const router = Router();

router.route("/user").post(users.addUser).get(users.getUsers);
