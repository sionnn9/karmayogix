// server/src/app.mjs
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: [process.env.CORS_ORIGIN, "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
console.log("CORS Origins:", process.env.CORS_ORIGIN);
// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes

// Test route
app.get("/try", (req, res) => {
  res.json({ message: "Flow Gaurd API is running" });
});

export default app;
