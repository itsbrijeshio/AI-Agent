import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils";
import { envConfig } from "../config";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";

const asyncHandler =
  (fn: Function, errorFormatter = defaultErrorFormatter) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      const { statusCode, ...rest } = errorFormatter(error);
      if (statusCode == 500) {
        console.log("ERROR", error);
      }
      res.status(statusCode).json({
        ...rest,
        statusCode,
        success: false,
      });
    }
  };

export default asyncHandler;

const formatZodError = (zodError: any) => {
  return zodError.issues?.reduce((acc: any, issue: any) => {
    const path = issue.path.join(".");
    acc[path] = {
      code: issue.code, // e.g., 'invalid_type'
      message: issue.message, // e.g., 'Expected string, got number'
      expected: issue.expected, // (Optional) Expected type
      received: issue.received, // (Optional) Received type
    };
    return acc;
  }, {});
};

const defaultErrorFormatter = (error: any) => {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      message: "Validation Error.",
      error: formatZodError(error),
    };
  } else if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  } else if (
    error instanceof JsonWebTokenError ||
    error instanceof NotBeforeError ||
    error instanceof TokenExpiredError
  ) {
    return {
      statusCode: 401,
      message: "Unauthorized Access",
    };
  } else {
    return {
      statusCode: 500,
      message: "Something went wrong.",
      error: envConfig.nodeEnv == "development" && error.stack,
    };
  }
};
