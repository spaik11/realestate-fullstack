const express = require("express");
const router = express.Router();

const { createUser, login, logout } = require("./controllers/userController");

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
