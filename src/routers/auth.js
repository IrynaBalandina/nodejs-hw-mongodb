import { Router } from "express";
import { validateBody } from "../utils/validateBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import { authRegisterSchema, authLoginSchema } from "../validation/authSchema.js";
import * as authController from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(authRegisterSchema), ctrlWrapper(authController.registerController));
authRouter.post("/login", validateBody(authLoginSchema), ctrlWrapper(authController.loginController));
export default authRouter;
