const { AvatarGenerator } = require("random-avatar-generator");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BaseController = require("./base");

const { User } = require("../models/user");

const { appConfig } = require("../config/config");

const logger = require("../logger");

class UserController extends BaseController {
  constructor() {
    super(User);
  }

  async registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    console.log(req.body);

    try {
      let user = await User.findOne({ email });

      // Check if user already exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }

      const avatarGenerator = new AvatarGenerator();
      const avatar = avatarGenerator.generateRandomAvatar("avatar");

      user = new User({ name, email, avatar, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        appConfig.jwtSecret,
        appConfig.jwtOptions,
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      logger.info(`REGISTER SUCCESS: ${JSON.stringify({ name, email })}`);
    } catch (err) {
      console.error(err.message);
      logger.error(`REGISTER ERROR: ${err.message}`);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = UserController;
