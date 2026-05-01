export type ApiError =
  | {
      success: false;
      type: "VALIDATION_ERROR";
      errors: {
        field: string;
        message: string;
        code?: string;
      }[];
    }
  | {
      success: false;
      type: "SERVER_ERROR";
      message: string;
    }
  | {
      success: false;
      type: "AUTH_ERROR";
      message: string;
    };
