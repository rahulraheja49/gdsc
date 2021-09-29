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

    const dateNow = new Date();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.exp < dateNow.getTime() / 1000) {
      res.status(403).send({ msg: "Token expired", success: false });
    }
    // console.log(decoded);

    if (Date.now() >= exp * 1000) {
      return false;
    }

    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Authorization failed" });
  }
};
