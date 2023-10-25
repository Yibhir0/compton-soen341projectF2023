const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'SOEN341F2023@gmail.com',
    pass: 'Soen341$',
  },
});

const tokenExpiry = 3600000; // 1h

const resetTokens = {};

app.post('/api/resetPassword', (req, res) => {
  const { email } = req.body;

  // Generate a unique token
  const token = crypto.randomBytes(20).toString('hex');
  const tokenExpiryDate = Date.now() + tokenExpiry;

  // Store the token with the email in-memory (You should use a database in production)
  resetTokens[email] = { token, tokenExpiryDate };

  // reset link
  const resetLink = `http://localhost:3000/reset/${token}`;

  const mailOptions = {
    from: 'SOEN341F2023@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ' + error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Password reset email sent');
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
