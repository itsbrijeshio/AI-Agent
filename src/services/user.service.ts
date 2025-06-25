import { ObjectId } from "mongoose";
import argon2 from "argon2";
import { userModel } from "../models";
import { ApiError, generateRefreshToken } from "../utils";
import { UserType } from "../types";

type UserProp = {
  name?: string;
  email: string;
  password: string;
};

class UserService {
  #sanitize = (user: any) => {
    const { password, __v, refreshToken, ...rest }: UserType = user;
    return rest;
  };

  #hashPassword = async (password: string) => {
    return await argon2.hash(password);
  };

  #verifyPassword = async (hash: string, password: string) => {
    return await argon2.verify(hash, password);
  };

  #isEmail = async (email: string) => {
    const isUser = await userModel.findOne({ email });
    return !!isUser;
  };

  signUp = async ({ name, email, password }: UserProp) => {
    if (await this.#isEmail(email)) {
      throw new ApiError(409, "Email ID already exists.");
    }

    const hashedPassword = await this.#hashPassword(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.#sanitize(newUser?.toJSON());
  };

  login = async ({ email, password }: UserProp) => {
    const user = await userModel.findOne({ email });
    if (!!!user || !!!(await this.#verifyPassword(user.password, password))) {
      throw new ApiError(400, "Invalid Credentials");
    }
    const refreshToken = await generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    return { user: this.#sanitize(user?.toJSON()), refreshToken };
  };

  getProfile = async (userId: ObjectId) => {
    const user = await userModel.findById(userId);
    if (!!!user) {
      throw new ApiError(401, "Unu");
    }

    return this.#sanitize(user?.toJSON());
  };

  logout = async (userId: ObjectId) => {
    const user = await userModel.findById(userId);
    if (!!!user) {
      throw new ApiError(400, "");
    }
    user.refreshToken = "";
    await user.save();

    return this.#sanitize(user?.toJSON());
  };

  getRefreshToken = async (userId: ObjectId) => {
    const user = await userModel.findById(userId);
    if (user) {
      const refreshToken = await generateRefreshToken(user);
      user.refreshToken = refreshToken;
      await user.save();
      return { user: this.#sanitize(user), refreshToken };
    }
    throw new ApiError(401, "Unauthorized access");
  };
}

export default UserService;
