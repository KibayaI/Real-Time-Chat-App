import { Router } from "express";
import { file } from "../controllers/fileController.mjs";
import upload from "../utils/files/upload.mjs";

const fileRouter = Router();

fileRouter.route("/upload").post(upload.single("file"), file.uploadSingleFile);

export default fileRouter;
