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
  deleteFavorite,
  updateProfile,
} = require("./controllers/userController");

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/logout", logout);
router.put(
  "/update-profile",
  checkAuthMiddleware,
  findUserIfUserExist,
  hasAuthorization,
  updateProfile
);

router.put(
  "/add-favorites",
  checkAuthMiddleware,
  findUserIfUserExist,
  hasAuthorization,
  addToFavorites
);

router.delete(
  "/delete-favorite",
  checkAuthMiddleware,
  findUserIfUserExist,
  hasAuthorization,
  deleteFavorite
);

module.exports = router;
