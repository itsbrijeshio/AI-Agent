import jwt from "jsonwebtoken";
import { envConfig } from "../config";
import asyncHandler from "./asyncHandler";
import { ApiError } from "../utils";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";

const authGuard = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const headerToken = req.headers?.get?.("authorization")?.split(" ")[1];
    const token = req.cookies?.accessToken || headerToken;
    if (!token) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const decoded = await jwt.verify(token, envConfig.accessTokenSecret);
    if (typeof decoded !== "string") {
      req.auth = { id: decoded.id };
    }

    if (!!!req.auth) {
      throw new ApiError(401, "Unauthorized Access");
    }
    next();
  }
);

export default authGuard;
