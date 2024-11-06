const express = require("express");
const router = express.Router();
const { login, signup, getUser } = require("../controller/authController");
const authenticateToken = require("../util/authenticateToken");

// Login Route
router.post("/v1/login", login);

//Signup route
router.post("/v1/signup", signup);

//Get User Detials
router.get("/v1/user", authenticateToken, getUser);

module.exports = router;
