const express = require("express");

//This is the router for visits
const {
   getVisits, addVisit, updateVisit, deleteVisit
} = require("../controllers/visit.controller");

const router = express.Router();

router.get("/visits", getVisits);
router.post("/visit", addVisit);
router.put("/visits/:id", updateVisit);
router.delete("/visits/:id", deleteVisit);

module.exports = router;