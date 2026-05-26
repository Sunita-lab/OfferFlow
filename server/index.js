const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://offer-flow-chi.vercel.app',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

app.use('/api/upload', require('./routes/upload'));
app.use('/api/email', require('./routes/email'));
app.use('/api/pdf', require('./routes/pdf'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));