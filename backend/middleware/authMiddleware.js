const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1]; // 🔥 VERY IMPORTANT

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded); // ✅ check

    req.user = decoded; // { id: userId }

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};