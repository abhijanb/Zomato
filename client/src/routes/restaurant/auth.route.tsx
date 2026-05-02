import type { RouteObject } from "react-router-dom"
import RegisterPage from "../../pages/restaurant/auth/register.restaurant"
import LoginPage from "../../pages/restaurant/auth/login.restaurant"

const authRoute: RouteObject[] = [
    {
        path: "/restaurant/register",
        element: <RegisterPage />
    },
    {
        path: "/restaurant/login",
        element: <LoginPage />
    }
]

export default authRoute