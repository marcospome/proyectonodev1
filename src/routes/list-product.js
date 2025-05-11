import express from 'express';
import sqlite3 from 'sqlite3';

// Creamos el router
const router = express.Router();


// Ruta GET para listar todos los productos
router.get('/', (req, res) => {
    const db = new sqlite3.Database("./src/db/crud.db");
  
    const sql = `SELECT * FROM products`;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Error al obtener los productos' });
      }
  
      res.status(200).json({
        message: 'Lista de productos',
        products: rows
      });
    });
  
    db.close();
  });

  export default router;
