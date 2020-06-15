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
  getAllFavorites,
  updateProfile,
  sendMail
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

<<<<<<< HEAD
router.post("/sendMail", sendMail);
=======
router.get(
  "/all-favorites",
  checkAuthMiddleware,
  findUserIfUserExist,
  hasAuthorization,
  getAllFavorites
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
>>>>>>> c7de117a4bcfa45fa4297ac706b40af565df4b54

module.exports = router;
