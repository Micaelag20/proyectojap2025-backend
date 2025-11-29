const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ecommerce'
};

// Ruta: /api/cart (POST) - SIMPLIFICADO
router.post('/', async (req, res) => {
    let connection;
    try {
        const { items } = req.body; // ← Solo recibimos items
        
        console.log('📦 Recibiendo carrito con items:', items);

        // Validación simplificada
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El carrito está vacío'
            });
        }

        // Conectar a MariaDB
        connection = await mysql.createConnection(dbConfig);

        // Iniciar transacción
        await connection.beginTransaction();

        // 1. Insertar el pedido SIN cliente_id
        const [pedidoResult] = await connection.execute(
            'INSERT INTO pedido () VALUES ()' // ← Pedido sin cliente
        );
        const pedidoId = pedidoResult.insertId;

        // 2. Insertar los productos del pedido
        for (const item of items) {
            await connection.execute(
                'INSERT INTO pedido_producto (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
                [pedidoId, item.productoId, item.cantidad]
            );
        }

        // 3. Confirmar transacción
        await connection.commit();

        res.json({
            success: true,
            message: 'Pedido guardado exitosamente',
            pedidoId: pedidoId,
            totalItems: items.length
        });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Error al guardar pedido:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor: ' + error.message
        });
    } finally {
        if (connection) await connection.end();
    }
});

// Ruta original para buy.json
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