const jwt = require("jsonwebtoken");

exports.getToken = async (req, res) => {
  try {
    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(200).send({ success: true, token });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};
