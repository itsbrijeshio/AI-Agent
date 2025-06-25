import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

// User
export type UserType = {
  _id:ObjectId,
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  plan: "free" | "premium";
  credits: number;
  lastLogin: NativeDate;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  __v?: number;
  refreshToken?: string;
};

export interface TransJwtPayload extends JwtPayload {
  id: ObjectId;
}

export interface AuthRequest extends Request {
  auth: TransJwtPayload;
  cookies: Record<string, string>;
}
