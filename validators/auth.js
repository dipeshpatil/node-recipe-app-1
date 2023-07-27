const { check } = require("express-validator");

module.exports = {
  basicUserLoginValidator: [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password"),
  ],
};
