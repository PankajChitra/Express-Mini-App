import dotenv from 'dotenv';
dotenv.config();
import connectDB from './DB/Index.js';

import express from 'express';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorhandler.js';
import noteRoutes from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/api/notes', noteRoutes);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));