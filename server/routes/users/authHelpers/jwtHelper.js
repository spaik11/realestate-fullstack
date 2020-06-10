const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("./jwtConfig");
const User = require("../model/User");

const passwordValidator = async (dbPw, userPw) => {
  try {
    const passwordValid = await bcrypt.compare(dbPw, userPw);

    return passwordValid;
  } catch (error) {
    return error;
  }
};

const jwtTokenIssue = (user) => {
  let payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    favorites: user.favorites,
    profile: {
      address: user.profile.address,
      phoneNumber: user.profile.phoneNumber,
      creditScore: user.profile.creditScore,
    },
  };

  let jwtToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return jwtToken;
};

const checkAuthMiddleware = expressJwt({
  secret: process.env.ACCESS_TOKEN_SECRET || config["ACCESS_TOKEN_SECRET"],
  userProperty: "auth",
});

const findUserIfUserExist = async (req, res, next) => {
  const { _id } = req.auth;

  try {
    const foundUser = await User.findById({ _id: _id }).select(
      "-__v -password"
    );
    req.profile = foundUser;
    next();
  } catch (e) {
    return res.status(404).json({
      error: "User does not exist",
    });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  } else {
    next();
  }
};

module.exports = {
  passwordValidator,
  jwtTokenIssue,
  checkAuthMiddleware,
  findUserIfUserExist,
  hasAuthorization,
};
