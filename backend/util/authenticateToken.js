const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
console.log(secretKey);
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token =
    authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : null;
  console.log("Token recieved ", token);
  if (!token || token === null) {
    return res.status(403).json({ message: "Token required" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = { id: decoded.id }; // Attach userId to req.user
    console.log("User id is ", req.user);
    next();
  } catch (error) {
    console.log("Error for token verifying ", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;
