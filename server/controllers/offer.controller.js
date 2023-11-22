const Offer = require("../models/offer.model");
const nodemailer = require('nodemailer');
const User = require("../models/user.model");

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
//  AddOffer
const addOffer = async (req, res) => {
  console.log(req.body)
  const offer = new Offer(req.body);
  try {

    // Send the email notification for offer received (to homebuyer)
    messageEmail = 'Your offer is succefully sent ! \n The broker will contact you soon.';

    await sendEmail(offer.email, messageEmail);


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

//send email
const sendEmail = async (email, messageEmail) => {
  // Create a nodemailer transporter using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'comptonfall2023@gmail.com',
      pass: 'kwes vzvj ozxt klkg',
    },
  });

  // Setup email data with unicode symbols
  const mailOptions = {
    from: 'comptonfall2023@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Offer Notification', // Subject line
    text: `${messageEmail}`, // plain text body
  };
  
  // Send mail with defined transport object
  await transporter.sendMail(mailOptions);

  //console.log('Email sent successfully');
};

module.exports = { getOffers, addOffer, updateOffer, sendEmail };