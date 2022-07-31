const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWTToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_JWT, {
    expiresIn: "1d",
  });
};

module.exports = { createJWTToken };
