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
  "http://localhost:5173",
  "https://notesapi-tau.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use('/api/notes', noteRoutes);
app.use('/api/auth', authRoute);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));