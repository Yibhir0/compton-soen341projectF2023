const express = require("express");


const{
    register,
    login,
} = require("../controllers/register.login.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;