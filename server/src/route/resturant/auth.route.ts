import express from 'express';
import authController from '../../controller/restaurant/authController.js';
import validationMiddleware from '../../middleware/validationMiddleware.js';
import { loginRestaurant, restaurantRegisterSchema } from '../../validation/restaurant/authValidation.js';
const authRouter: express.Router = express.Router();
authRouter.post('/register',validationMiddleware(restaurantRegisterSchema) ,authController.register);
authRouter.post('/login',validationMiddleware(loginRestaurant) ,authController.login);
export default authRouter;