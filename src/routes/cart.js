const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Ruta: /api/cart/buy.json
router.get('/buy.json', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/cart/buy.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar compra' });
  }
});

module.exports = router;