const nodemailer = require('nodemailer');
const Visit = require("../models/visit.model");


// Get all visits
const getVisits = async (req, res) => {
  try {
    const { brokerId } = req.query;
    const visits = await Visit.find({ brokerID: brokerId })

    res.status(200).json(visits);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Adds a visit
const addVisit = async (req, res) => {
  const visit = new Visit(req.body);

  try {
    // Send the email notification for visit sent succefully (to homebuyer)
    messageEmail = 'Your visit request is succefully sent ! \n The broker will contact you soon.';
    await sendEmail(visit.email, messageEmail);

    const newVisit = await visit.save();
    res.status(201).json(newVisit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Updates visits
const updateVisit = async (req, res) => {


  const { id } = req.params;


  try {

    const visit = await Visit.findByIdAndUpdate(id, req.body);;

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    // Save the updated user
    //const updatedVisit = await visit.save();

    res.status(200).json(visit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Deletes a requested visist
const deleteVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const visit = await Visit.findByIdAndDelete(id);
    if (!visit) {
      return res.status(404).json({ message: "Cannot find any visit with id " + id + " to delete." })
    }
    res.status(200).json(visit);
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
    subject: 'Visit Notification', // Subject line
    text: `${messageEmail}`, // plain text body
  };
  
  // Send mail with defined transport object
  await transporter.sendMail(mailOptions);

  //console.log('Email sent successfully');
};

module.exports = { getVisits, addVisit, updateVisit, deleteVisit };