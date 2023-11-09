const express = require("express");
const { sendCode,reset} = require("../controllers/passwordReset.controller");
const router = express.Router();

router.post("/code", sendCode);
router.post("/password", reset);

module.exports = router;