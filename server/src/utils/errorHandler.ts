import type { ApiError } from "../types/types.js";
import ValidationError from "./validationError.js";

const errorHandler = (err: ApiError, req: any, res: any) => {
    if (err instanceof ValidationError) {
       return  res.status(400).json(err.error);
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
};
export default errorHandler;