import express from 'express';
import authController from '../../controller/resturant/authController.js';
import validationMiddleware from '../../middleware/validationMiddleware.js';
import { loginResturant, restaurantRegisterSchema } from '../../validation/resturant/authValidation.js';
const authRouter: express.Router = express.Router();
authRouter.post('/register',validationMiddleware(restaurantRegisterSchema) ,authController.register);
authRouter.post('/login',validationMiddleware(loginResturant) ,authController.login);
export default authRouter;