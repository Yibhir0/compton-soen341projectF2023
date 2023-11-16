const express = require("express");

//This is the router of the authentication
const {
    register,
    login,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;