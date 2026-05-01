import type { Request, Response } from "express"
import resturantService from "../../service/resturantService.js"
import { created, ok } from "../../utils/response.js";

async function register(req: Request, res: Response) {
    const resturant = await resturantService.registerResturant(req.body);
    created(res, resturant);
}

async function login(req: Request, res: Response) {
    const { accessToken, ...resturantData } = await resturantService.loginResturant(req.body);
    ok(res, { accessToken, ...resturantData });
}

export default {
    register,
    login
}