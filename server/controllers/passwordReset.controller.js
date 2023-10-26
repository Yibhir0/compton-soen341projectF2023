const nodemailer = require('nodemailer');
const User = require('../models/user.model');
const nodemailerConfig = require('../config/nodemailer.config');

// Function to generate and send a reset code to the user's email
const sendResetCode = async (email) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  // Generate a random reset code, e.g., a 6-digit number
  const resetCode = Math.floor(100000 + Math.random() * 900000);

  // Define email message
  const mailOptions = {
    from: 'soen341f2023@gmail.com',
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${resetCode}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);

  // Return the reset code for further processing
  return resetCode;
};

// Controller function to send reset code and save it in the user's document
exports.sendResetCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate and send the reset code
    const resetCode = await sendResetCode(email);

    // Save the reset code and its expiration in the user's document
    const user = await User.findOne({ email });
    user.resetCode = resetCode;
    user.resetCodeExpiration = Date.now() + 3600000; // Code valid for 1 hour
    await user.save();

    res.json({ message: 'Reset code sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
  
    try {
      // Find the user by their email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Check if the provided reset code matches the one stored in the database
      if (code !== user.resetCode) {
        return res.status(400).json({ message: 'Invalid reset code' });
      }
  
      // Check if the reset code has expired (assuming a 1-hour expiration)
      if (user.resetCodeExpiration < Date.now()) {
        return res.status(400).json({ message: 'Reset code has expired' });
      }
  
      // Update the user's password with the new password
      // You should hash the new password for security before saving it
      user.password = newPassword;
      await user.save();
  
      // Clear the reset code and its expiration
      user.resetCode = null;
      user.resetCodeExpiration = null;
      await user.save();
  
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  