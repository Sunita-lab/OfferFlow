const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parse');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const results = [];

  const parser = csv.parse({ columns: true, trim: true });

  parser.on('readable', function () {
    let record;
    while ((record = parser.read()) !== null) {
      results.push(record);
    }
  });

  parser.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });

  parser.on('end', () => {
    res.json({ success: true, data: results });
  });

  parser.write(req.file.buffer);
  parser.end();
});

module.exports = router;