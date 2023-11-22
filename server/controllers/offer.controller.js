const Offer = require("../models/offer.model");
const User = require("../models/user.model");
const nodemailer = require('nodemailer');

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
    
    /* --------------------------------------------
    * Works, but when the test run I have an error. 
    * It does not find a user 
    * To fix if we have time
     -------------------------------------------- */

    //Send the email notification for new offer received (to broker)
    licenseNumber = offer.brokerLiscence
    const user = await User.findOne({ licenseNumber });
    if (!user) {
      return res.status(401).json({ error: 'no user found' });
    }
    console.log("before send")
    messageEmail = 'A new offer as been received, Check your offer on compton real estate';
    await sendEmail(user.email, messageEmail);
    console.log("after send ")

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

//send email
const sendEmail = async (email, messageEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'comptonfall2023@gmail.com',
        pass: 'kwes vzvj ozxt klkg',
      },
    });

    const mailOptions = {
      from: 'comptonfall2023@gmail.com',
      to: email,
      subject: 'Offer Notification',
      text: `Offer notification message: ${messageEmail}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};
module.exports = { getOffers, addOffer, updateOffer, sendEmail };