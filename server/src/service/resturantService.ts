import Resturant from "../model/resturant.model.js"
import type { LoginResturantInput, RegisterResturantInput } from "../validation/resturant/authValidation.js"

async function registerResturant(resturantData: RegisterResturantInput) {
    const existingResturant = await Resturant.findOne({ email: resturantData.email });
    if (existingResturant) {
        throw new Error('Resturant already exists');
    }
    const resturant = await Resturant.create(resturantData);
    const { password, ...resturantInfo } = resturant.toObject();
    return resturantInfo;
}

async function loginResturant(loginData: LoginResturantInput) {
    const resturant = await Resturant.findOne({ email: loginData.email });
    if (!resturant) {
        throw new Error('Resturant not found');
    }
    const isPasswordValid = await resturant.comparePassword(loginData.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    // generate access token 
    const accessToken = resturant.generateAccessToken();
    if (loginData.rememberMe) {
        const refreshToken = resturant.generateRefreshToken();
        // save refresh token in database
        resturant.refreshToken = refreshToken;
        await resturant.save();
    }
    const { password, ...resturantData } = resturant.toObject();
    return { ...resturantData, accessToken };
}

export default {
    registerResturant,
    loginResturant
}