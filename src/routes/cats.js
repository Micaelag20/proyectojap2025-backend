const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Ruta: /api/cats/cat.json
router.get('/cat.json', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/cats/cat.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar categorías' });
  }
});

module.exports = router;