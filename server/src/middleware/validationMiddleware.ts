import type { NextFunction, Request, Response } from "express";
import type { ZodSchema, ZodError } from "zod";
import ValidationError from "../utils/validationError.js";

const validationMiddleware = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = formatZodErrors(result.error);
            throw new ValidationError(errors);
        }
        req.body = result.data;
        next();
    };
};

function formatZodErrors(error: ZodError) {
    return error.issues.map((issue) => ({
        field: issue.path.length ? issue.path.join(".") : "root",
        message: issue.message,
        code: issue.code,
    }));
}

export default validationMiddleware;
