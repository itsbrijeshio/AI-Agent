import { Request, Response } from "express";
import { asyncHandler } from "../middlewares";
import { response } from "../utils";
import { initiateGroq as groq } from "../apis";

class AIController {
  handleTryChat = asyncHandler(async (req: Request, res: Response) => {
    const { prompt } = req.body;
    const aiResponse = await groq(prompt);
    response(res, 200, { prompt, response: aiResponse });
  });
}

export default AIController;
