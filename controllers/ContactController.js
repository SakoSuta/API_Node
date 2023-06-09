const { Request, Response } = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    mailer: process.env.MAILER,
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.PASSMAIL,
    },
  });

const ContactController = {
  MailNew: async (data, res) => {
    const user = data;
    const mailOptions = {
      from: FROM_EMAIL,
      to: `${user.email}`,
      subject: 'Hello from MailTrap!',
      text: 
      `
Hello ${user.pseudo},

Welcome to our website! We are thrilled to have you onboard. You can now enjoy all of our services and features.

If you have any questions or need assistance, feel free to reach out to us. Our team will be happy to help you.

Once again, welcome, and thank you for joining our community!

Best regards,
The Website Team`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
  ConfimeSub: async (data, res) => {
    const subscription = data;
    const mailOptions = {
      from: FROM_EMAIL,
      to: `${subscription.user[0].email}`,
      subject: 'Confirmation of your subscription!',
      text: `
Dear ${subscription.user[0].name},

Welcome to ${subscription.plan[0].name}! We are thrilled to confirm that your subscription ${subscription.plan[0].name} has been successfully activated. Get ready for an incredible gaming experience like never before!

As a subscriber, you now have unlimited access to a vast library of games, including new releases, popular titles, and beloved classics. Dive into captivating worlds, embark on thrilling adventures, and challenge your skills with a wide range of genres and gameplay styles.

We're here to ensure you have the best gaming experience possible. Should you have any questions, encounter any issues, or need assistance, our dedicated support team is available around the clock to help you.

Get ready to embark on unforgettable gaming adventures, challenge your skills, and immerse yourself in a world of endless entertainment. Start exploring our game library today and let the fun begin!

Thank you for choosing ${subscription.plan[0].name}. We're excited to have you on board!

Best regards,
The Website Team`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
  ConfimeUnsub: async (data, res) => {
    const subscription = data;
    const mailOptions = {
      from: FROM_EMAIL,
      to: `${subscription.user[0].email}`,
      subject: 'Confirmation of your unsubscription!',
      text: `
Dear ${subscription.user[0].name},

We have received your request to unsubscribe from ${subscription.plan[0].name}. We want to inform you that your unsubscribe request has been processed and will be effective from the next billing cycle.

We understand that your needs and preferences may change, and we respect your decision to end your subscription. We [0]sincerely thank you for the time you have spent with us and for being a part of our gaming community.

During the remaining period of your subscription, you will continue to enjoy all the benefits and features associated with your subscription. Tak[0]e this time to explore and fully enjoy our extensive library of games.

If you ever decide to come back to us in the future, please know that you will always be welcome at ${subscription.plan[0].name} or esle. We would be delighted to provide you with an exceptional gaming experience once again.

If you have any questions or need further assistance, please don't hesitate to contact our support team. We are here to help.

We hope that your experience with ${subscription.plan[0].name} has been enjoyable and that you have been able to discover and appreciate a multitude of exciting games. We wish you the best in all your future gaming adventures.

Thank you again for your trust and allowing us to accompany you on your gaming journey.

Best regards,
The Website Team`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
  ChangingPassword: async (data, res) => {
    const user = data;
    const mailOptions = {
      from: FROM_EMAIL,
      to: `${user.email}`,
      subject: 'Confirmation of your password change!',
      text: `
Dear ${user.name},

We hereby confirm that your password has been successfully changed.

If you did not initiate this change, please contact us immediately for additional security measures.

Thank you for using our service.

Best regards,
The Website Team`,
      };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
  ContactPage: async (req, res) => {
    const { name, email, subject, message } = req.body;
    const mailOptions = {
      from: `${email}`,
      to: process.env.FROM_EMAIL,
      subject: `${subject}(from ${name})`,
      text: `${message}`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail sent:', info.messageId);
      res.json({ message: 'E-mail sent successfully.'});
    } catch (error) {
      console.error('Error sending email:', error);
    }
  },
};

module.exports = ContactController;
