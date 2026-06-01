const express = require('express');
const router = express.Router();
const sgMail = require('../utils/mailer');

router.post('/send', async (req, res) => {
  console.log('Request received:', req.body?.candidate?.email);
  const { candidate, subject, body, pdfBase64 } = req.body;

  try {
    const populatedSubject = subject
      .replace(/{{name}}/g, candidate.name)
      .replace(/{{role}}/g, candidate.role);

    const populatedBody = body
      .replace(/{{name}}/g, candidate.name)
      .replace(/{{role}}/g, candidate.role);

    const msg = {
      to: candidate.email,
      from: process.env.SMTP_USER, // SendGrid pe verified sender
      subject: populatedSubject,
      html: populatedBody,
      attachments: [
        {
          filename: `offer-letter-${candidate.name}.pdf`,
          content: pdfBase64,
          type: 'application/pdf',
          disposition: 'attachment',
        }
      ]
    };

    await sgMail.send(msg);
    console.log('Email sent to:', candidate.email);
    res.json({ status: 'sent' });

  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ status: 'failed', error: err.message });
  }
});

module.exports = router;