const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// user model import
const User = require("../models/userModel");

const userRegister = async (req, res, next) => {
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
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // if email and password not exist
    if (!email || !password) {
      return res.status(401).json({ msg: "Please Enter Email and Password!" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Email or Password!!" });
    }

    let isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Email or Password!!" });
    }

    if (user && isMatch) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
      console.log(user);
    } else {
      res.status(401).json({ msg: "Invalid Email or Password" });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
};

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };
//   cookieOptions.secure = true;

//   res.cookie("jwt", token, cookieOptions);

//   user.password = undefined;

//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: {
//       user,
//     },
//   });
// };

// exports.protect = catchAsync(async (req, res, next) => {
//   //  Get token
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ msg: "You are not Logged in!" });
//   }

//   // Verify token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   //  user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     res.status(401).json({ msg: "user doesnt exist" });
//   }

//   req.user = currentUser;
//   next();
// });
