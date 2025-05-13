import express from 'express';
import productRoutes from './routes/product.js';
import dotenv from 'dotenv';
import db from './db/connectDB.js';

dotenv.config();

//process.loadEnvFile() // Carga el archivo .env
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/products', productRoutes);



app.listen(PORT, () => console.log(`Servidor en funcionamiento: http://localhost:${PORT}`));

// Manejar el cierre de la aplicación (por ejemplo, con CTRL+C)
process.on('SIGINT', () => {
    console.log("Cerrando el servidor y la conexión a la base de datos...");
    db.close((err) => {
        if (err) {
            console.error("Error al cerrar la base de datos:", err.message);
        } else {
            console.log("Conexión a la base de datos cerrada.");
        }
        server.close(() => { // Cierra el servidor Express
            console.log("Servidor cerrado. Saliendo...");
            process.exit(0); // Sale del proceso de Node.js
        });
    });
});