import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
//import morgan from 'morgan'

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";
import { authLimiter, generalLimiter } from "./middleware/rateLimiter.js";

//const routes = require('./routes');
//const errorHandler = require('./middleware/errorHandler');
//const logger = require('./utils/logger');

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middleware
// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(helmet());
app.use(cookieParser());
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Logging
//app.use(morgan('combined', { stream: { write: message => logger.info(message) } }));

// Routes
//app.use('/api/user', userRoutes);
app.use("/api", generalLimiter);
app.use("/api/auth", authRoutes, authLimiter);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
//app.use('/api/product', productRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
