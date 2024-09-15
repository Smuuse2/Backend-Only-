const jwt = require('jsonwebtoken')
const config = require("../Config/auth");

module.exports = async (req, res, next) => {
  // const token = req.headers.authorization?.startsWith("Bearer") && req.headers.authorization?.split(' ')[1]
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(404).send({ message: "no token provided" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(400).send({ message: "token expired" });
    }
    req.id = decoded.id;
    next();
  });
};