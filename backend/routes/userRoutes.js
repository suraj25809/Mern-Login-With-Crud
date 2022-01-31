const express = require("express");
const router = express.Router();

// controller define
const { userRegister, userLogin } = require("../controller/userController");

// Register
router.post("/register", userRegister);

// Login
router.post("/login", userLogin);

router.get("/logout", async (req, res, next) => {
  res.status(200).json({ status: "success", token: null });
});

module.exports = router;
