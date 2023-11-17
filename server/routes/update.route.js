const express = require("express");
const { updateAccountInfo} = require("../controllers/update.controller");
const router = express.Router();

router.post("/update-info", updateAccountInfo);

module.exports = router;