const express = require("express");

//This is the router of offers
const { getOffers, addOffer, updateOffer} = require("../controllers/offer.controller");
const router = express.Router();

router.get("/offers", getOffers);
router.post("/offer", addOffer);
router.put("/offers/update/:id", updateOffer);

module.exports = router;