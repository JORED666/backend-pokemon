const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pokemonRoutes = require('./routes/pokemon');

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

app.use('/api', pokemonRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
