import { Router } from "express";
import aiRouter from "./ai";
import authRouter from "./auth";
import userRouter from "./user";
import { authGuard, rateLimiter } from "../../middlewares";

const router = Router();

router.use("/chat", rateLimiter({ max: 30 }), aiRouter);
router.use("/auth", rateLimiter({ max: 60 }), authRouter);
router.use("/users", rateLimiter({ max: 60 }), authGuard, userRouter);

export default router;
