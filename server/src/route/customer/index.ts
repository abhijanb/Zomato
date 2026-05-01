import expresss from 'express';
import authRouter from './auth.route.js';
const customerRouter:expresss.Router = expresss.Router();
customerRouter.use('/auth',authRouter);

export default customerRouter;