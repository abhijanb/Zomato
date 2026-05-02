import express from 'express';
import customerRouter from './customer/index.js';
import riderRouter from './rider/index.js';
import restaurantRouter from './resturant/index.js';
const router:express.Router = express.Router();
router.use('/restaurant',restaurantRouter);
router.use('/customer',customerRouter);
router.use('/rider',riderRouter);
export default router;