import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import cats from "./data/cats.json";
import products from "./data/products.json";
import comments from "./data/products_comments.json";
import sell from "./data/sell.json";
import userCart from "./data/user_cart.json";

// Se crean las rutas para cada endpoint
app.get("/", (req, res) => {
  res.json({ message: "Funcionamiento correcto de la API" });
});

// Devuelve la lista de categorías
app.get("/cats", (req, res) => {
  res.json(cats);
});

// Devuelve la lista de productos
app.get("/products", (req, res) => {
  res.json(products);
});

// Devuelve la lista de comentarios de productos
app.get("/products/comments", (req, res) => {
  res.json(comments);
});

// Devuelve la información de ventas
app.get("/sell", (req, res) => {
  res.json(sell);
});

// Devuelve la información del carrito de usuario
app.get("/user_cart", (req, res) => {
  res.json(userCart);
});
const PORT = 3000;

// Se inicia el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Backend funcionando en http://localhost:${PORT}`);
});
