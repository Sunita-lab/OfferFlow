const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/generate', async (req, res) => {
  const { html } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=offer-letter.pdf'
    });

    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;