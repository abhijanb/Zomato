import expresss from 'express';
import authRouter from './auth.route.js';
const riderRouter: expresss.Router = expresss.Router();
riderRouter.use('/auth', authRouter);

export default riderRouter;