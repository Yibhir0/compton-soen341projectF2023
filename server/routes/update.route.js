const express = require("express");
const { updateBroker, updateClient, updateAdmin} = require("../controllers/update.controller");
const router = express.Router();

router.get("/broker", updateBroker);
router.post("/client", updateClient);
router.post("/client", updateAdmin);

module.exports = router;