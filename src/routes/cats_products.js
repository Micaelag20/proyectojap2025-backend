const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Ruta: /api/cats_products/101.json
router.get('/:id.json', (req, res) => {
  try {
    const categoryId = req.params.id;
    const filePath = path.join(__dirname, `../data/cats_products/${categoryId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Categoría no encontrada' });
  }
});

module.exports = router;