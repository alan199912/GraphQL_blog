const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const { user } = jwt.verify(token, process.env.SECRET_JWT);
    req.verifyUser = user;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = { authenticate };
