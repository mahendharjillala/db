import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

// Load environment variables
dotenv.config();  // Automatically loads .env file from the root directory

const app = express();

// Set up port, with a fallback to 3000 if not defined in .env
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// CORS configuration (allowing all origins for development, not recommended for production)
app.use(
  cors({
    origin: "*",  // Allow requests from any origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API Routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is listening on http://localhost:${port}`);
  }
});
