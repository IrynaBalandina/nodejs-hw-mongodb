import { Router } from "express";
import { validateBody } from "../utils/validateBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import { authRegisterSchema, authLoginSchema, sendResetEmailSchema, resetPasswordSchema} from "../validation/authSchema.js";
import * as authController from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(authRegisterSchema), ctrlWrapper(authController.registerController));
authRouter.post("/login", validateBody(authLoginSchema), ctrlWrapper(authController.loginController));
authRouter.post("/refresh", ctrlWrapper(authController.refreshTokenController));
authRouter.post("/logout", ctrlWrapper(authController.logoutController));
authRouter.post("/send-reset-email",validateBody(sendResetEmailSchema), ctrlWrapper(authController.sendResetEmailController));
authRouter.post("/reset-password",validateBody(resetPasswordSchema),ctrlWrapper(authController.resetPasswordController),);
export default authRouter;
