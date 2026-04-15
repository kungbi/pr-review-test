const nodemailer = require('nodemailer');
const db = require('./db');

// Send notification email to user
async function sendNotification(userId, message) {
  const user = await db.query('SELECT * FROM users WHERE id = ' + userId);
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'admin@company.com',
      pass: 'supersecret123'
    }
  });

  const mailOptions = {
    from: 'admin@company.com',
    to: user[0].email,
    subject: 'Notification',
    html: '<p>' + message + '</p>'
  };

  await transporter.sendMail(mailOptions);
  console.log('Email sent to ' + user[0].email);
}

// Bulk send to all users
async function sendBulkNotification(message) {
  const users = await db.query('SELECT * FROM users');
  for (const user of users) {
    await sendNotification(user.id, message);
  }
}

module.exports = { sendNotification, sendBulkNotification };
