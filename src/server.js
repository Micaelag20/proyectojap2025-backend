const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

// Importar rutas

//Rutas publicas

app.use('/api/auth', require('./routes/auth'));

//Rutas protegidas
app.use('/api/cats', authMiddleware, require('./routes/cats'));
app.use('/api/cats_products', authMiddleware, require('./routes/cats_products'));
app.use('/api/products', authMiddleware, require('./routes/products'));
app.use('/api/products_comments', authMiddleware, require('./routes/products_comments'));
app.use('/api/user_cart', authMiddleware, require('./routes/user_cart'));
app.use('/api/cart', authMiddleware, require('./routes/cart'));
app.use('/api/sell', authMiddleware, require('./routes/sell'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

