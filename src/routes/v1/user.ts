import { Router } from "express";
import { UserController } from "../../controllers";
import { validateRequest } from "../../middlewares";

const router = Router();

const userController = new UserController();

router.get("/me", userController.handleGetProfile);

export default router;
