import express from 'express';
import userRoutes from './routes/users.js'
import productRoutes from './routes/product.js'
import listproductRoutes from './routes/list-product.js'
import sqlite3 from "sqlite3";

process.loadEnvFile() // Carga el archivo .env

const db = new sqlite3.Database("./src/db/crud.db");

const app = express();
const PORT = process.env.PORT;

// habilita el parseo de json dentro del sistema, por defecto es undefined
app.use(express.json())

app.use('/users', userRoutes);

app.use('/add-product', productRoutes);

app.use('/list-product', listproductRoutes);

app.listen(PORT, () => console.log(`Servidor en funcionamiento: http://localhost:${PORT}`));
