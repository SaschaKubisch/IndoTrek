const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('your-sendgrid-api-key');

module.exports = {
  sendEmail: async (to, subject, html) => {
    try {
      const msg = {
        to,
        from: 'your-email@example.com',
        subject,
        html,
      };

      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
      throw new Error('Failed to send email');
    }
  },
};
