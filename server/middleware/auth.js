const jwt = require("jsonwebtoken");
const chalk = require("chalk");

exports.userAuth = async (req, res, next) => {
  try {
    // Get the token from the header
    const token = req.header("x-auth-token");

    // Check if no token
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Authorization failed" });
  }
};
