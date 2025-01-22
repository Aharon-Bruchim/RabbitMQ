import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { createResponse } from "../utils/utils";
import * as setupService from "../services/setupService";

export const setup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.query;
  await setupService.sendToQueue(String(message));  
  const surprise = await setupService.startListening();
  res
    .status(200)
    .json(createResponse(surprise, "setup successful")); 
});

 