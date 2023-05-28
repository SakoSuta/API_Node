const { Response } = require('express');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    mailer: 'smtps',
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'df6612f8b6dab2',
      pass: '2866932e32d031',
    },
  });

const ContactController = {
  MailNew: async (data, res) => {
    const user = data;
    const mailOptions = {
      from: 'sakosuta.em@gmail.com',
      to: `${user.email}`,
      subject: 'Hello from MailTrap!',
      text: `Welcome to MailTrap ${user.pseudo}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail sent:', info.messageId);
      res.json({ message: 'E-mail sent successfully.' });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
};

module.exports = ContactController;
