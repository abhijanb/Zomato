import bcrypt from "bcryptjs";
import type { IResturant } from "../types/resturant.type.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema<IResturant>({
    resturantName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    ratingAverage: {
        type: Number,
        default: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    licenseNumber: {
        type: String,
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
    address: {
        type: {
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

resturantSchema.index({ "address": "2dsphere" });

resturantSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next;
});

resturantSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

resturantSchema.methods.generateAccessToken = function () {
    const payload = {
        id: this._id,
        email: this.email,
    };
    // generate access token using jwt
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return accessToken;
}

resturantSchema.methods.generateRefreshToken = function () {
    const payload = {
        id: this._id,
        email: this.email,
    };
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
    return refreshToken;
}

const Resturant = mongoose.model("Resturant", resturantSchema);

export default Resturant;