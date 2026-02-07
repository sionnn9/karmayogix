import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.config.mjs";
import app from "./src/app.mjs";
import http from "http";
const server = http.createServer(app);

const PORT = process.env.PORT;
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
