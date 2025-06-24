import { Response } from "express";

const response = (res: Response, statusCode: number, data: any) => {
  const message = data?.message || "Success";
  const responseData = {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    message,
    data: data || null,
  };
  res.status(statusCode).json(responseData);
};

export default response;