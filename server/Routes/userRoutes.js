const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup route
router.post("/signup", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    // Checking if user already exists
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Store the hashed password in the req body
    req.body.password = hashedPassword;

    // Create the new user & save
    const newUser = await User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User Successfully Registered!",
      data: newUser,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User doesn't exist, please Sign Up",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid/Wrong Password entered!",
      });
    }

    const token = jwt.sign({ userID: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "1d",
    });

    res.json({
        success:true,
        // user:user,
        message:"Welcome Back!",
        token:token
    });

  } catch (error) {
    res.send({
        success:false,
        message:error.message
    })
  }
});

module.exports = router;
