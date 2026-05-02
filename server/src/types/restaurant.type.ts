import type mongoose from "mongoose";

export interface IRestaurant extends mongoose.Document {
    restaurantName: string;
    email: string;
    password: string;
    description: string;
    phoneNumber: string;
    ratingAverage: number;
    totalReviews: number;
    licenseNumber: string;
    isOpen: boolean;
    address: {
        latitude: number;
        longitude: number;
        city: string;
        street: string;
    };
    refreshToken?: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}