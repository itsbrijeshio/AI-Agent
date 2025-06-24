import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import asyncHandler from "./asyncHandler";

type SourceType = "body" | "params" | "query";

const validateRequest = (schema: ZodSchema, source: SourceType = "body") =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const values = req[source];
    await schema.parseAsync(values);
    next();
  });

export default validateRequest;
