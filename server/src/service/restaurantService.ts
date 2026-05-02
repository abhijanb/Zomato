import Restaurant from "../model/restaurant.model.js"
import type { LoginRestaurantInput, RegisterRestaurantInput } from "../validation/restaurant/authValidation.js"

async function registerRestaurant(restaurantData: RegisterRestaurantInput) {
    const existingRestaurant = await Restaurant.findOne({ email: restaurantData.email });
    if (existingRestaurant) {
        throw new Error('Restaurant email already exists');
    }
    const restaurant = await Restaurant.create(restaurantData);
    const { password, ...restaurantInfo } = restaurant.toObject();
    return restaurantInfo;
}

async function loginRestaurant(loginData: LoginRestaurantInput) {
    const restaurant = await Restaurant.findOne({ email: loginData.email });
    if (!restaurant) {
        throw new Error('Restaurant not found');
    }
    const isPasswordValid = await restaurant.comparePassword(loginData.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    // generate access token 
    const accessToken = restaurant.generateAccessToken();
    if (loginData.rememberMe) {
        const refreshToken = restaurant.generateRefreshToken();
        console.log("Generated refresh token:", refreshToken);
        // save refresh token in database
        restaurant.refreshToken = refreshToken;
        await restaurant.save();
    }
    console.log(restaurant)
    const refreshToken = loginData.rememberMe ? restaurant.refreshToken : null;
    const user = {
        id: restaurant._id,
        restaurantName: restaurant.restaurantName,
        email: restaurant.email,
    };
    return { accessToken, refreshtoken: refreshToken, user };
}

export default {
    registerRestaurant,
    loginRestaurant
}