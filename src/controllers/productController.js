import sqlite3 from 'sqlite3';

// Función para validar el input
const validateProductInput = ({ name, price }) => {
  if (typeof name !== 'string') return 'El nombre debe ser una cadena de texto';
  if (typeof price !== 'number') return 'El precio debe ser un número';
  return null;
};

// POST - Crear producto
export const createProduct = (req, res) => {
  const { name, price, description } = req.body;

  const error = validateProductInput({ name, price });
  if (error) return res.status(400).json({ error });

  const db = new sqlite3.Database('./src/db/crud.db');
  const sql = `INSERT INTO products (name, price, description) VALUES (?, ?, ?)`;
  const params = [name, price, description || null];

  db.run(sql, params, function (err) {
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
        description: description || null,
      },
    });
  });

  db.close();
};

// GET - Listar productos
export const listProducts = (req, res) => {
  const db = new sqlite3.Database('./src/db/crud.db');
  const sql = `SELECT * FROM products`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }

    res.status(200).json({
      message: 'Lista de productos',
      products: rows,
    });
  });

  db.close();
};
