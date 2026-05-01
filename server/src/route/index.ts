import express from 'express';
import resturantRouter from './resturant/index.js';
import customerRouter from './customer/index.js';
import riderRouter from './rider/index.js';
const router:express.Router = express.Router();
router.use('/resturant',resturantRouter);
router.use('/customer',customerRouter);
router.use('/rider',riderRouter);
export default router;