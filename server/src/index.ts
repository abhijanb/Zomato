import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import router from './route/index.js';
import errorHandler from './utils/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer().catch((error) => {
  console.error('Error starting server:', error);
});


app.use('/api', router);
app.use(errorHandler);