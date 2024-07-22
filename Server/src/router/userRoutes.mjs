import { Router } from "express";
import { users } from "../controllers/userController.mjs";

const userRouter = Router();

userRouter.route("/user").post(users.addUser).get(users.getUsers);
userRouter.route("/user/:credentials").get(users.login);

export default userRouter
