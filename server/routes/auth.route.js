const express = require("express");


const{
    register,
    login,
    resetPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/resetPassword", resetPassword);

module.exports = router;