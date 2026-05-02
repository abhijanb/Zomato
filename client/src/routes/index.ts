import type { RouteObject } from "react-router-dom";
import authRoute from "./restaurant/auth.route";

const route:RouteObject[] = [
    ...authRoute
]
export default route;