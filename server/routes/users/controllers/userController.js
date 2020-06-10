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
    const {
      name,
      email,
      password,
      favorites,
      profile: { address, phoneNumber, creditScore },
    } = req.body;

    try {
      let createdUser = new User({
        email,
        password,
        name,
        favorites,
        profile: {
          address,
          phoneNumber,
          creditScore,
        },
      });

      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);
      createdUser.password = hashedPassword;

      await createdUser.save();
      console.log("Created User:", createdUser);

      let jwtToken = jwtTokenIssue(createdUser);

      res.cookie("jwt-cookie-expense", jwtToken, {
        expires: new Date(Date.now() + 36000 * 60 * 24),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      res.json({
        user: createdUser,
      });
    } catch (e) {
      res.status(500).json({
        message: getErrorMessage(e),
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
            expires: new Date(Date.now() + 36000 * 60 * 24),
            httpOnly: false,
            secure: process.env.NODE_ENV === "production" ? true : false,
          });

          foundUser = foundUser.toObject();
          delete foundUser.password;

          console.log("foundUser: ", foundUser);

          res.json({ user: foundUser });
        }
      }
    } catch (e) {
      res.status(500).json({
        message: getErrorMessage(e),
      });
    }
  },
  logout: (req, res) => {
    res.clearCookie("jwt-cookie-expense");
    res.end();
  },
  addToFavorites: async (req, res) => {
    try {
      let user = await User.findById({ _id: req.body._id });
      let property = req.params.id;

      user.favorites.push(property);
      user.save();

      res.json({ message: "Added to favorites!" });
    } catch (e) {
      res.status(500).json({
        message: getErrorMessage(e),
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      let user = req.body._id;
      let updatedUser = await User.findByIdAndUpdate({ _id: user }, req.body, {
        new: true,
      }).select("-__v -userCreated");

      updatedUser = updatedUser.toObject();
      delete updatedUser.password;

      res.clearCookie("jwt-cookie-expense");

      let jwtToken = jwtTokenIssue(updatedUser);

      res.cookie("jwt-cookie-expense", jwtToken, {
        expires: new Date(Date.now() + 36000 * 60 * 24),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      res.json({ user: updatedUser });
    } catch (e) {
      res.status(500).json({
        message: getErrorMessage(e),
      });
    }
  },
};
