const Offer = require("../models/offer.model");
//  GetOffer//
const getOffers = async (req, res) => {
  try {
    const { brokerId } = req.query;
    const offers = await Offer.find({ brokerID: brokerId })
    res.status(200).json(offers);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getMyOffers = async (req, res) => {
  try {
    const { brokerId } = req.query;
    const offers = await Offer.find({ sentBrokerID: brokerId })
    res.status(200).json(offers);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//  AddOffer
const addOffer = async (req, res) => {
  console.log(req.body)
  const offer = new Offer(req.body);
  try {
    const newOffer = await offer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  DelOffer
const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByIdAndUpdate(id,req.body);
    if (!offer) {
      return res.status(404).json({ message: "Cannot find any offer with id " + id + " to delete." })
    }
    res.status(200).json(offer);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = { getOffers, addOffer, updateOffer, getMyOffers };