const bcrypt = require("bcryptjs");
const User = require("../model/User");
const getErrorMessage = require("../authHelpers/dbErrorHelper");
const {
  passwordValidator,
  jwtTokenIssue,
} = require("../authHelpers/jwtHelper");
require("dotenv").config();

module.exports = {
  createUser: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      let createdUser = await new User({
        email,
        password,
        username,
      });

      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);
      createdUser.password = hashedPassword;

      await createdUser.save();

      res.json({
        message: "User created",
      });
    } catch (error) {
      res.status(500).json({
        message: getErrorMessage(error),
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      let foundUser = await User.findOne({ email }).select("-__v -userCreated");

      if (!foundUser) {
        throw Error("User not found, please sign up");
      } else {
        const verifyPw = await passwordValidator(password, foundUser.password);

        if (!verifyPw) {
          throw Error("Password incorrect");
        } else {
          let jwtToken = jwtTokenIssue(foundUser);

          res.cookie("jwt-cookie-expense", jwtToken, {
            expires: new Date(Date.now() + 36000),
            httpOnly: false,
            secure: process.env.NODE_ENV === "production" ? true : false,
          });

          foundUser = foundUser.toObject();
          delete foundUser.password;

          res.json({ user: foundUser });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: getErrorMessage(error),
      });
    }
  },
  logout: (req, res) => {
    res.clearCookie("jwt-cookie-expense");
    res.end();
  },
};
