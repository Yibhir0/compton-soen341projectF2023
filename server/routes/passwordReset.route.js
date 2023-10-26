const express = require("express");

const{
    passwordReset
} = require("../controllers/passwordReset.controller");

const router = express.Router();

router.post("/passwordReset",passwordReset);

module.exports = router;