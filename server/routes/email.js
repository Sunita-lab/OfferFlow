const express = require('express');
const router = express.Router();
const transporter = require('../utils/mailer');
const { jsPDF } = require('jspdf');
const template1 = require('../templates/template1');
const template2 = require('../templates/template2');
const template3 = require('../templates/template3');

const templateMap = { 1: template1, 2: template2, 3: template3 };

router.post('/send', async (req, res) => {
  const { candidates, subject, body, templateId } = req.body;

  const templateFn = templateMap[templateId];
  if (!templateFn) {
    return res.status(400).json({ error: 'Invalid templateId' });
  }

  const results = [];

  for (const candidate of candidates) {
    try {
      // PDF generate karo
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text('ABC PRIVATE LTD', 20, 20);
      doc.setFontSize(12);
      doc.text(`Dear ${candidate.name},`, 20, 40);
      doc.text(`Role: ${candidate.role}`, 20, 55);
      doc.text(`Internship: ${candidate.internship_name}`, 20, 65);
      doc.text(`Start Date: ${candidate.start_date}`, 20, 75);
      doc.text(`Duration: ${candidate.duration}`, 20, 85);
      doc.text(`Mode: ${candidate.mode}`, 20, 95);
      doc.text(`Organization: ${candidate.organization}`, 20, 105);
      doc.text(`AICTE Code: ${candidate.AICTE_code || 'N/A'}`, 20, 115);
      doc.text('We look forward to having you on board.', 20, 135);
      doc.text('Regards,', 20, 155);
      doc.text('ABC Private Ltd', 20, 165);

      const pdf = Buffer.from(doc.output('arraybuffer'));

      const populatedSubject = subject
        .replace(/{{name}}/g, candidate.name)
        .replace(/{{role}}/g, candidate.role);

      const populatedBody = body
        .replace(/{{name}}/g, candidate.name)
        .replace(/{{role}}/g, candidate.role);

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: candidate.email,
        subject: populatedSubject,
        html: populatedBody,
        attachments: [{
          filename: `offer-letter-${candidate.name}.pdf`,
          content: pdf,
          contentType: 'application/pdf'
        }]
      });

      results.push({ email: candidate.email, status: 'sent' });

    } catch (err) {
      results.push({ email: candidate.email, status: 'failed', error: err.message });
    }
  }

  res.json({ results });
});

module.exports = router;