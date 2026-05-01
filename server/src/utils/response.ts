
import { type Response } from 'express';
import STATUS_CODE, { type StatusCode } from '../constant/status-code.const.js';
import type { ErrorCode } from '../constant/error-code.const.js';

export type ApiResponse<T> = {
    success: true;
    data: T;
    meta?: Record<string, unknown>;
};

export type ApiErrorResponse = {
    success: false;
    error: {
        code: ErrorCode;
        message: string;
        details?: unknown;
    };
};

function successResponse<T>(
    data: T,
    meta?: Record<string, unknown>
): ApiResponse<T> {
    return {
        success: true,
        data,
        ...(meta && { meta }),
    };
}

function errorResponse(
    code: ErrorCode,
    message: string,
    details?: unknown
): ApiErrorResponse {
    return {
        success: false,
        error: {
            code,
            message,
            details,
        },
    };
}

export function ok<T>(res: Response, data: T, meta?: Record<string, unknown>) {
    const result = successResponse(data, meta);

    res.status(STATUS_CODE.OK).json(result);
}

export function created<T>(res: Response, data: T) {
    const result = successResponse(data);

    res.status(STATUS_CODE.CREATED).json(result);
}

export function noContent(res: Response) {
    res.status(STATUS_CODE.NO_CONTENT).send();
}

export function paginated<T>(
    res: Response,
    items: T[],
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
    }
) {
    const result = successResponse(items, {
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            totalItems: pagination.totalItems,
            totalPages: Math.ceil(pagination.totalItems / pagination.limit),
        },
    });

    res.status(STATUS_CODE.OK).json(result);
}

export function fail(
    res: Response,
    {
        status,
        code,
        message,
        details,
    }: {
        status: StatusCode;
        code: ErrorCode;
        message: string;
        details?: unknown;
    }
) {
    res.status(status).json(errorResponse(code, message, details));
}

