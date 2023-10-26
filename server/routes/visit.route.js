const express = require("express");
const{
   getVisits,addVisit
} = require("../controllers/visit.controller");

const router = express.Router();

router.get("/visits", getVisits);
router.post("/visit", addVisit);

module.exports = router;