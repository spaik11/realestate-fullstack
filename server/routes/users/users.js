const express = require("express");
const router = express.Router();
const {
  checkAuthMiddleware,
  findUserIfUserExist,
  hasAuthorization,
} = require("./authHelpers/jwtHelper");

const {
  createUser,
  login,
  logout,
  addToFavorites,
  updateProfile,
  sendMail
} = require("./controllers/userController");

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/logout", logout);

router.put("/add-favorites", addToFavorites);
router.put(
  "/update-profile",
  checkAuthMiddleware,
  findUserIfUserExist,
  hasAuthorization,
  updateProfile
);

router.post("/sendMail", sendMail);

module.exports = router;
