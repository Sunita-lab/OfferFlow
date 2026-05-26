const express = require('express');
const router = express.Router();
const transporter = require('../utils/mailer');
const puppeteer = require('puppeteer');
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

  // ✅ Browser ek baar launch
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (const candidate of candidates) {
    try {
      // ✅ Template backend generate kare
      const html = templateFn(candidate);

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
      });
      await page.close(); // ✅ browser nahi, sirf page close

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
        html: populatedBody, // ✅ html, not text
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

  await browser.close(); // ✅ loop ke baad close
  res.json({ results });
});

module.exports = router;