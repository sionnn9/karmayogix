// server/server.mjs

import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.mjs";
import http from "http";
const server = http.createServer(app);

const PORT = process.env.PORT;
console.log(PORT);
server.listen(PORT);
console.log(`Server running on port ${PORT}`);
