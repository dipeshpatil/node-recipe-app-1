const express = require("express");

const UserController = require("../../controllers/user");

const { basicUserRegistrationValidator } = require("../../validators/user");

const router = express.Router();
const userController = new UserController();

/**
 * @route   GET api/users
 * @desc    Get User
 * @access  Public
 */
router.get("/", userController.getAll.bind(userController));

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.post(
  "/",
  [basicUserRegistrationValidator],
  userController.registerUser.bind(userController)
);

module.exports = router;
