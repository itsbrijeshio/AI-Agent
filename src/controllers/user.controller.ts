import { Request, Response } from "express";
import { UserService } from "../services";
import { asyncHandler } from "../middlewares";
import { response, signCookie } from "../utils";
import { AuthRequest } from "../types";

class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  handleGetProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.auth;
    const user = await this.userService.getProfile(id);
    response(res, 200, { user });
  });
}

export default UserController;
