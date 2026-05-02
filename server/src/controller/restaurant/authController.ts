import type { Request, Response } from "express"
import { created, ok } from "../../utils/response.js";
import restaurantService from "../../service/restaurantService.js";

async function register(req: Request, res: Response) {
    const restaurant = await restaurantService.registerRestaurant(req.body);
    created(res, restaurant);
}

async function login(req: Request, res: Response) {
    console.log("Login request body:", req.body);
    const { accessToken, refreshtoken, user } = await restaurantService.loginRestaurant(req.body);
    const isProd = process.env.NODE_ENV === "production";

    // If "remember me" is off, we don't want a persistent refresh cookie.
    if (!refreshtoken) {
        res.clearCookie("refreshToken");
    } else {
        // Important: browsers reject SameSite=None cookies unless Secure=true.
        // In local dev (http://localhost) use Lax + insecure.
        res.cookie("refreshToken", refreshtoken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    ok(res, { accessToken, refreshtoken, user });
}

export default {
    register,
    login
}