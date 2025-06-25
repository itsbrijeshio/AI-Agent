import { Router } from "express";
import { AuthController } from "../../controllers";
import {
  authGuard,
  authRefreshToken,
  validateRequest,
} from "../../middlewares";
import { signUpSchema, loginSchema } from "../../schemas/user";

const router = Router();

const authController = new AuthController();

router.post(
  "/signup",
  validateRequest(signUpSchema, "body"),
  authController.handleSignUp
);
router.post(
  "/login",
  validateRequest(loginSchema, "body"),
  authController.handleLogin
);
router.get("/logout", authGuard, authController.handleLogout);
router.get(
  "/refresh-token",
  authRefreshToken,
  authController.handleRefreshToken
);

export default router;
