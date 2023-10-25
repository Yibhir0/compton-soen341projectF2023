const express = require('express');
const router = express.Router();


const{
    passwordReset,
} = require("../controllers/auth.controller");

router.post('/passwordReset',passwordReset );


module.exports = router;
