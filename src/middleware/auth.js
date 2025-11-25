const jwt = require('jsonwebtoken');
const JWT_SECRET = '12345';

const authMiddleware = (req, res, next) => {
    try {
        // Obtener el token del encabezado Authorization - FORMA CORRECTA
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }

        // Extraer el token y eliminar el prefijo 'Bearer '
        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token no válido'
            });
        }

        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Adjuntar la información del usuario al objeto req
        req.user = decoded;

        // Continuar al siguiente middleware o ruta
        next();

    } catch (error) {
        console.log("Error en la autenticación", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }
        
        return res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
};


module.exports = authMiddleware;