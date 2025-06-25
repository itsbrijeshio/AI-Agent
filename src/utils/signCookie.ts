import { envConfig } from "../config";
import { generateAccessToken } from "./tokens";
import { Response } from "express";
import { UserType } from "../types";

const signCookie = async (
  res: Response,
  user: UserType,
  options: object = {}
) => {
  const token = await generateAccessToken(user);
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: envConfig.nodeEnv === "production",
    sameSite: "none",
    ...options,
  });
  return token;
};

export default signCookie;
