const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//Clave secreta
const JWT_SECRET = 'tu_clave_secreta_aqui';

//usuarios 

const users = [
  { id: 1, username: 'admin', password: 'admin123' },
  { id: 2, username: 'usuario', password: 'password123' }
];

// endpoint POST /login

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar que vengan los campos
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Usuario y contraseña son requeridos' 
      });
    }

    // Buscar usuario
     const user = users.find(u => u.username === username || u.email === username);
    if (!user || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Credenciales inválidas' 
      });
    }

    // Verificar contraseña
     if (user.password !== password) {
      return res.status(401).json({ 
        success: false,
        message: 'Contraseña incorrecta' 
      });
    }

        // Generar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      JWT_SECRET,                               
      { expiresIn: '24h' }                      
    );

    // Responder con el token
    return res.json({
  success: true,
  message: 'Login exitoso',
  token: token,
  user: {  // ← Asegúrate de incluir este objeto 'user'
    id: user.id,
    username: user.username
  }
});

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
});

module.exports = router;