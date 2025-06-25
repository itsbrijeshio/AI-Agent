import jwt, { SignOptions } from "jsonwebtoken";
import { envConfig } from "../config";

const getDay = (day: string): number => {
  const time = 1000 * 60 * 60 * 24 * (parseInt(day) || 30);
  return time;
};

export const generateRefreshToken = async (user: any): Promise<string> => {
  const payload = { id: user._id };
  const options: SignOptions = {
    expiresIn: getDay(envConfig.refreshTokenExpire),
  };
  const token = await jwt.sign(payload, envConfig.refreshTokenSecret, options);
  return token;
};

export const generateAccessToken = async (user: any): Promise<string> => {
  const payload = { id: user._id };
  const options: SignOptions = {
    expiresIn: getDay(envConfig.accessTokenExpire),
  };
  const token = await jwt.sign(payload, envConfig.accessTokenSecret, options);
  return token;
};
