const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Ruta: /api/products/40281.json
router.get('/:id.json', (req, res) => {
  try {
    const productId = req.params.id;
    const filePath = path.join(__dirname, `../data/products/${productId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;