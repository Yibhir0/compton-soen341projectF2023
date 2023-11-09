const User = require("../models/user.model");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");


//to reset password

const reset = async(req, res) =>{ 
  const { email, password, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    if (code != user.resetCode){
      return res.status(401).json({ error: 'Invalid reset code' });
      
    }
    
    const hashedPassword = await bcrypt.hash(password,10);
    user.password = hashedPassword;
    await user.save();


    
    return res.status(200).json({ message: "Email found, verification code sent soon" });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
//send code 
const sendCode = async(req, res) =>{ 
  const { email } = req.body;
  

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }


    const code = Math.floor(1000 + Math.random() * 900);


    user.resetCode = code;
    await user.save();
    console.log(user);

    // Send the email with the code
    await sendResetCodeEmail(email, code);

    
    return res.status(200).json({ message: "Email found, verification code sent soon" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
//send email // not working
const sendResetCodeEmail = async (email, code) => {
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
    subject: 'Password Reset Code', // Subject line
    text: `Your password reset code is: ${code}`, // plain text body
  };

  // Send mail with defined transport object
  await transporter.sendMail(mailOptions);

  console.log('Email sent successfully');
};
module.exports = {
    sendCode,
    reset,
    sendResetCodeEmail,
};