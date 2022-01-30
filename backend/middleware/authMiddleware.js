const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// authenticates user before accessing specified route
const protectRoute = async (req, res, next) => {
  try {
    // req.headers.authorization && req.headers.authorization.startsWith("Bearer");
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
      next();
    } else {
      res.status(401).json({ message: "Unauthorised Access Login Now!" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ message: "Unathorised Access" });
  }
};

module.exports = protectRoute;

// module.exports = function (req, res, next) {
//   const token = req.cookies.userjwt;
//   if (!token) {
//     return res.json({ message: "Login First" });
//   }
//   try {
//     const decode = jwt.verify(token, process.env.SECRET);
//     req.user = decode.user;
//     next();
//   } catch (error) {
//     return res.json({ message: "Unathorised Access" });
//   }
// };
