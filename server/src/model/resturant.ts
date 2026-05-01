import mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });