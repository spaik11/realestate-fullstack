const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  logout,
  addToFavorites,
} = require("./controllers/userController");

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/logout", logout);

router.put("/add-favorites", addToFavorites);

module.exports = router;
