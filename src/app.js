import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import peliculasRoutes from './routes/peliculasRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(peliculasRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({ error: 'Algo salio mal en el servidor'});
});

app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});