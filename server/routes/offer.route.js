const express = require("express");

//This is the router of offers
const { getOffers, addOffer, updateOffer, deleteOffer} = require("../controllers/offer.controller");
const router = express.Router();

router.get("/offers", getOffers);
router.post("/offer", addOffer);
router.put("/offers/:id", updateOffer);
router.delete("/offers/:id", deleteOffer);

module.exports = router;