import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);
