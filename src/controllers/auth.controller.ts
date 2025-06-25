import { Request, Response } from "express";
import { UserService } from "../services";
import { asyncHandler } from "../middlewares";
import { response, signCookie } from "../utils";
import { AuthRequest } from "../types";

class AuthController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  handleSignUp = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await this.userService.signUp({ name, email, password });
    response(res, 201, { user });
  });

  handleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, refreshToken } = await this.userService.login({
      email,
      password,
    });
    const accessToken = await signCookie(res, user);
    response(res, 200, { accessToken, refreshToken });
  });

  handleLogout = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.auth;
    await this.userService.logout(id);
    res.clearCookie("accessToken");
    response(res, 200, {});
  });

  handleRefreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.auth;
    const { user, refreshToken } = await this.userService.getRefreshToken(id);
    const accessToken = await signCookie(res, user);
    response(res, 200, { accessToken, refreshToken });
  });
}

export default AuthController;
