import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const asyncHandler =
  (fn: Function, errorFormatter = defaultErrorFormatter) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      const { statusCode, ...rest } = errorFormatter(error);

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
  } else {
    return {
      statusCode: 500,
      message: "Something went wrong.",
    };
  }
};
