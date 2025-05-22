const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");

router.get("/dashboard", authenticate, (req, res) => {
  res.status(200).json({
    message: "Welcome to the protected dashboard!",
    userId: req.user.userId,
  });
});

module.exports = router;

