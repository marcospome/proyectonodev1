import express from 'express';
import sqlite3 from 'sqlite3';

// Creamos el router
const router = express.Router();

// Ruta POST para crear un nuevo producto
router.post('/', (req, res) => {
  const db = new sqlite3.Database("./src/db/crud.db");

  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: name y price' });
  }

  const sql = `INSERT INTO products (name, price, description) VALUES (?, ?, ?)`;
  const params = [name, price, description || null];

  db.run(sql, params, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al insertar el producto' });
    }

    res.status(201).json({
      message: 'Producto creado exitosamente',
      product: {
        id: this.lastID,
        name,
        price,
        description: description || null
      }
    });
  });

  db.close();
});

export default router;
