const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// user model import
const User = require("../models/userModel");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, useremail, phone, password } = req.body;
    const user_exist = await User.findOne({ email: useremail });
    if (user_exist) {
      return res.status(401).json({ message: "User Already Exist!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name: username,
      email: useremail,
      phone: phone,
      password: hashPassword,
    });

    await user.save((err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "User Not Registered!", error: err.message });
      }
      return res
        .status(201)
        .json({ message: "User Register Successfully!", user: user });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json("Server Error");
  }
});

module.exports = router;
