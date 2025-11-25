const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

// Importar rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cats', require('./routes/cats'));
app.use('/api/cats_products', require('./routes/cats_products'));
app.use('/api/products', require('./routes/products'));
app.use('/api/products_comments', require('./routes/products_comments'));
app.use('/api/user_cart', require('./routes/user_cart'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/sell', require('./routes/sell'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});