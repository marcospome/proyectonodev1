import db from '../db/connectDB.js';

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

  
};

// GET - Listar productos
export const listProducts = (req, res) => {
  
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

  
};


// DELETE - Eliminar producto por id
export const deleteProduct = (req, res) => {
  const idToDelete = req.params.id;

  if (!idToDelete || isNaN(parseInt(idToDelete))) {
      return res.status(400).json({ error: 'Se debe proporcionar un ID de producto válido.' });
  }

  
  const sql = `delete from products where id = ?`;

  db.run(sql, [idToDelete], function (err) {
      if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error al eliminar el producto.' });
      }

      if (this.changes > 0) {
          res.status(200).json({ message: `Producto con ID ${idToDelete} eliminado exitosamente.` });
      } else {
          res.status(404).json({ message: `No se encontró ningún producto con ID ${idToDelete}.` });
      }
  });

  
};

// UPDATE - Eliminar producto por id
export const updateProduct = (req, res) => {
  const idToUpdate = req.params.id;
  const { name, price, description } = req.body;

  if (!idToUpdate || isNaN(parseInt(idToUpdate))) {
      return res.status(400).json({ error: 'Se debe proporcionar un ID de producto válido.' });
  }

  // Validar los datos que se van a actualizar
  const error = validateProductInput({ name, price });
  if (error) {
      return res.status(400).json({ error });
  }

  
  // Usar marcadores de posición para evitar la inyección de SQL y manejar correctamente los tipos de datos
  const sql = `UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?`;
  const params = [name, price, description || null, idToUpdate];

  db.run(sql, params, function (err) {
      if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Error al actualizar el producto.' });
      }

      if (this.changes > 0) {
          res.status(200).json({ message: `Producto con ID ${idToUpdate} actualizado exitosamente.` });
      } else {
          res.status(404).json({ message: `No se encontró ningún producto con ID ${idToUpdate}.` });
      }
  });

  
};