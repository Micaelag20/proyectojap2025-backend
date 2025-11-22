const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Ruta: /api/products_comments/40281.json
router.get('/:id.json', (req, res) => {
  try {
    const productId = req.params.id;
    const filePath = path.join(__dirname, `../data/products_comments/${productId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Comentarios no encontrados' });
  }
});

module.exports = router;
