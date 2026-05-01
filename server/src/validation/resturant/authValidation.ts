import { z } from "zod";

export const addressSchema = z.object({
    latitude: z
        .number()
        .min(-90, { message: "Latitude must be >= -90" })
        .max(90, { message: "Latitude must be <= 90" }),

    longitude: z
        .number()
        .min(-180, { message: "Longitude must be >= -180" })
        .max(180, { message: "Longitude must be <= 180" }),

    city: z
        .string()
        .min(1, { message: "City is required" }),

    street: z
        .string()
        .min(1, { message: "Street is required" }),
});

export const restaurantRegisterSchema = z.object({
    resturantName: z
        .string()
        .min(2, { message: "Restaurant name must be at least 2 characters" }),

    email: z
        .string()
        .email({ message: "Invalid email format" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),

    description: z
        .string()
        .min(10, { message: "Description should be meaningful" }),

    phoneNumber: z
        .string()
        .regex(/^[0-9]{7,15}$/, { message: "Invalid phone number" }),

    licenseNumber: z
        .string()
        .min(5, { message: "License number is required" }),

    address: addressSchema,
});

export const loginResturant = z.object({
    email: z
        .string()
        .email({ message: "Invalid email format" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean().default(false),
});
export type RegisterResturantInput = z.infer<typeof restaurantRegisterSchema>;
export type LoginResturantInput = z.infer<typeof loginResturant>;