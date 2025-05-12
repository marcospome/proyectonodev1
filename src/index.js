import express from 'express';
import sqlite3 from "sqlite3";
import productRoutes from './routes/product.js';

process.loadEnvFile() // Carga el archivo .env
const PORT = process.env.PORT;
const app = express();



const db = new sqlite3.Database("./src/db/crud.db");

app.use(express.json());
app.use('/products', productRoutes);



app.listen(PORT, () => console.log(`Servidor en funcionamiento: http://localhost:${PORT}`));
