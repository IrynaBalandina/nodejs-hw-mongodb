import { Router } from "express";
import { validateBody } from "../utils/validateBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import { authRegisterSchema } from "../validation/authSchema.js";
import * as authController from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(authRegisterSchema), ctrlWrapper(authController.registerController));
export default authRouter;
