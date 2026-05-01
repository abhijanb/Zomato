import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "../types/types.js";
import ValidationError from "./validationError.js";

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    try {
        console.error("Error occurred:", err);
        if (err instanceof ValidationError) {
            return res.status(400).json(err.error);
        } else {
            // why err.message is showing type error is not clear, so we are sending the whole error object for debugging
            res.status(500).json({ message: "Internal server error", err: err });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error handling the error", error: error });
    }
};
export default errorHandler;