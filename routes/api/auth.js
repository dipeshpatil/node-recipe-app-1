const express = require("express");

const AuthController = require("../../controllers/auth");

const { basicUserLoginValidator } = require("../../validators/auth");
const { authenticationMiddleware } = require("../../middlewares/auth");

const router = express.Router();
const authController = new AuthController();

/**
 * @route   GET api/auth
 * @desc    Get User
 * @access  Private
 */
router.get(
  "/",
  [authenticationMiddleware],
  authController.getUser.bind(authController)
);

/**
 * @route   POST api/auth
 * @desc    Login User
 * @access  Public
 */
router.post(
  "/",
  [basicUserLoginValidator],
  authController.authenticateUserAndGetToken.bind(authController)
);

module.exports = router;
