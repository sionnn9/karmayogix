// server/src/middleware/auth.middleware.mjs
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const returnIfCookieExists = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ exist: false, message: "Token missing" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    return res.status(200).json({ exist: true, data: decoded });
  } catch (error) {
    //.error("JWT verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

let middleWare = (req, res, next) => {
  let token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401);

  try {
    req.user = jwt.verify(token, process.env.JWTKEY);

    next();
  } catch {
    return res.status(401);
  }
};
