const bcrypt = require("bcryptjs");
const User = require("../model/User");
const getErrorMessage = require("../authHelpers/dbErrorHelper");
const {
  passwordValidator,
  jwtTokenIssue,
} = require("../authHelpers/jwtHelper");
require("dotenv").config();
// const sendEmail = require("../../../mail");
const mailer = require("nodemailer");

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
      let user = await User.findById({ _id: req.auth._id });

      let property = user.favorites.some(
        (prop) => prop.ListingKey === req.body.ListingKey
      );

      if (property) {
        res.json({ message: "Property is already in favorites" });
      } else {
        user.favorites.push(req.body);
        let success = await user.save();

        res.json(success);
      }
    } catch (e) {
      res.status(500).json({
        message: getErrorMessage(e),
      });
    }
  },
  deleteFavorite: async (req, res) => {
    try {
      let user = await User.findById({ _id: req.auth._id });

      let property = user.favorites.find(
        (prop) => prop.ListingKey === req.body.ListingKey
      );

      user.favorites.splice(user.favorites.indexOf(property), 1);
      let success = await user.save();

      res.json(success);
    } catch (e) {
      res.status(500).json({
        message: getErrorMessage(e),
      });
    }
  },
  getAllFavorites: async (req, res) => {
    try {
      let userID = req.auth._id;

      let foundAllFavorites = await User.findById({ _id: userID }).select(
        "-__v -password -userCreated"
      );

      res.json(foundAllFavorites.favorites);
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
  sendMail: (req, res) => {
    const { name, email, property } = req.body;
    const smtpTransport = mailer.createTransport({
      service: "Gmail",
      auth: {
        user: "truzillow@gmail.com",
        pass: "abcD123!",
      },
    });

    let mail = {
      from: "Truzillow Admin <truzillow@gmail.com>",
      to: "paul.garay@codeimmersives.com",
      subject: property,
      html: `${name} would like more information on ${property}. Please reply to ${email}`,
    };

    smtpTransport.sendMail(mail, function (error, response) {
      if (error) {
        res.status(500).json({ message: "email not sent" });
      } else {
        res.status(200).json({ message: "Email sent" });
      }
      smtpTransport.close();
    });
  },
};
