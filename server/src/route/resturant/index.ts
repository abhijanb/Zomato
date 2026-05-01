import expresss from 'express';
import authRouter from './auth.route.js';
const resturantRouter:expresss.Router = expresss.Router();
resturantRouter.use('/auth',authRouter)
export default resturantRouter;