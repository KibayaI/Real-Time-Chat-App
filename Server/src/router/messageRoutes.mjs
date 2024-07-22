import { Router } from "express";
import { message } from "../controllers/messageController.mjs";

const messageRouter = new Router();

messageRouter.route("/message").post(message.addMessage);
messageRouter.route("/messages").post(message.getMessages);

export default messageRouter;
