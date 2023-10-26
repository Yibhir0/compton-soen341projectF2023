const express = require('express');
const router = express.Router();

const{
    passwordReset,
} = require("../controllers/passwordReset.controller");

router.post('/passwordReset',passwordReset );

module.exports = router

