// server/src/app.mjs
import dotenv from "dotenv";
import express from "express";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import sensorRoute from "./routes/sensor.route.mjs";

const app = express();

const corsOptions = {
  origin: [process.env.FRONTEND_DOMAIN, "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
console.log("CORS Origins:", process.env.FRONTEND_DOMAIN);

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/sensors", sensorRoute);

// Test route
app.get("/try", (req, res) => {
  res.json({ message: "FlowGaurd API is running" });
});

export default app;
