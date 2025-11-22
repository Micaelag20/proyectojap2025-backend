const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Ruta: /api/user_cart/25801.json
router.get('/:id.json', (req, res) => {
  try {
    const userId = req.params.id;
    const filePath = path.join(__dirname, `../data/user_cart/${userId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

module.exports = router;
