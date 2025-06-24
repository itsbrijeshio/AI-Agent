import { Router } from "express";
import aiRouter from "./ai";
import { rateLimiter } from "../../middlewares";

const router = Router();

router.use("/chat", rateLimiter({ max: 30 }), aiRouter);

export default router;
