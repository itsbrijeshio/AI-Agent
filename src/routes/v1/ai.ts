import { Router } from "express";
import { AIController } from "../../controllers";
import { validateRequest } from "../../middlewares";
import { modelSchema } from "../../schemas/ai";

const router = Router();

const aiController = new AIController();

router.post(
  "/completions",
  validateRequest(modelSchema, "body"),
  aiController.handleTryChat
);

export default router;
