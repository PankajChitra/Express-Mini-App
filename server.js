require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorhandler');
const noteRoutes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(logger);
app.use('/api/notes', noteRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));