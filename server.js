import dotenv from 'dotenv';
dotenv.config();
import connectDB from './DB/Index.js';

import express from 'express';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorhandler.js';
import noteRoutes from './routes/routes.js';
import authRoute from './routes/authRoute.js';


const app = express();

app.use(express.json());
app.use(logger);
import cors from 'cors';

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'https://your-app.vercel.app'
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without origin (curl/Postman/mobile clients).
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS: Origin not allowed'));
    },
    credentials: true
  })
);

app.use('/api/notes', noteRoutes);
app.use('/api/auth', authRoute);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));