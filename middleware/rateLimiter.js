const rateLimit = require("express-rate-limit");

// 🔹 Rate limit for /register: 3 requests per hour per IP
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    message: "Too many registration attempts from this IP, please try again after an hour"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { registerLimiter };

