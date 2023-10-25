const express = require("express");


const{
    register,
    login,
    resetPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/resetPassword", resetPassword);
router.post("/register", register);
router.post("/login", login);

module.exports = router;