const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendVerificationEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");

router.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, token);
    res.status(200).json({ message: "Reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 POST /register
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const token = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      email,
      verificationToken: token,
      isVerified: false,
    });

    await newUser.save();
    await sendVerificationEmail(email, token);

    res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 POST /verify-registration
router.post("/verify-registration", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password)
    return res.status(400).json({ message: "Token and password are required" });

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.passwordHash = hashedPassword;
    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

