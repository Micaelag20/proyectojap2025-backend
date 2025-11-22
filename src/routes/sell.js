const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Ruta: /api/sell/publish.json
router.get('/publish.json', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/sell/publish.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al publicar producto' });
  }
});

module.exports = router;