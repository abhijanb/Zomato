import expresss from 'express';
import authRouter from './auth.route.js';
const restaurantRouter:expresss.Router = expresss.Router();
restaurantRouter.use('/auth',authRouter)
export default restaurantRouter;