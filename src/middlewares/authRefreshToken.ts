import jwt from "jsonwebtoken";
import { envConfig } from "../config";
import asyncHandler from "./asyncHandler";
import { ApiError } from "../utils";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";

const authRefreshToken = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const refreshToken = req.headers?.get?.("refreshToken")?.split(" ")[1];
    if (!refreshToken) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const decoded = await jwt.verify(
      refreshToken,
      envConfig.refreshTokenSecret
    );
    if (typeof decoded !== "string") {
      req.auth = { id: decoded.id };
    }

    if (!!!req.auth) {
      throw new ApiError(401, "Unauthorized Access");
    }
    next();
  }
);

export default authRefreshToken;
