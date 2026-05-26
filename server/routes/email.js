const express = require('express');
const router = express.Router();
const transporter = require('../utils/mailer');

router.post('/send', async (req, res) => {
  const { candidate, subject, body, pdfBase64 } = req.body;

  try {
    const populatedSubject = subject
      .replace(/{{name}}/g, candidate.name)
      .replace(/{{role}}/g, candidate.role);

    const populatedBody = body
      .replace(/{{name}}/g, candidate.name)
      .replace(/{{role}}/g, candidate.role);

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: candidate.email,
      subject: populatedSubject,
      html: populatedBody,
      attachments: [{
        filename: `offer-letter-${candidate.name}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }]
    });

    res.json({ status: 'sent' });

  } catch (err) {
    res.status(500).json({ status: 'failed', error: err.message });
  }
});

module.exports = router;