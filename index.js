//Importamos Express
import express from 'express';

//Importamos herramientas para trabajar con rutas
import path from 'path';
import { fileURLToPath } from 'url';

//Creamos la aplicacion Express
const app = express();

//Puerto del servidor
const PORT = 3000;

// Obtenemos la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtenemos la carpeta donde está este archivo
const __dirname = path.dirname(__filename);

// Array donde guardamos las películas
const peliculas = [
    { id: Date.now(), titulo: 'El Padrino', director: 'Francis Ford Coppola', anio: 1972 },
    { id: Date.now() + 1, titulo: 'Pulp Fiction', director: 'QuentinTarantino', anio: 1994 },
    { id: Date.now() + 2, titulo: 'Parásitos', director: 'Bong Joon-ho',anio: 2019 }
];

//Servimos los archivos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Permite recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

//Permite recibir datos en formato JSON
app.use(express.json());

app.get('/api/peliculas', (req, res) => {

    //Enviamos las peliculas como JSON
    res.json(peliculas);
});

app.post('/anadir-pelicula', (req, res) => {

    //Creamos una nueva pelicula
    const nuevaPelicula = {
        id: Date.now(),
        titulo: req.body.titulo,
        director: req.body.director,
        anio: req.body.anio
    };

    //Añadimos la pelicula al array
    peliculas.push(nuevaPelicula);

    //Volvemos a la pagina principal
    res.redirect('/');
});

app.post('/editar-pelicula', (req, res) => {

    //Mostramos los datos recibidos 
    console.log('datos recibidos:', req.body);

    //Convertimos el ID a numero
    const id = Number(req.body.id);
    console.log('id convertido:', id);

    //Buscamos la pelicula por su ID
    const pelicula = peliculas.find(pelicula => pelicula.id === id);
    console.log('pelicula encontrada:', pelicula);

    //Si encontramos la pelicula
    if (pelicula) {

        //Actualizamos sus datos
        pelicula.titulo = req.body.titulo;
        pelicula.director = req.body.director;
        pelicula.anio = req.body.anio;

        console.log('pelicula actualizada:', pelicula);
    }

    //Volvemos a la pagina principal
    res.redirect('/');
});

app.delete('/eliminar-pelicula', (req, res) => {

    //Convertimos el ID a numero
    const id = Number(req.body.id);

    //Buscamos la posicion de la pelicula
    const indice = peliculas.findIndex(pelicula => pelicula.id === id);

    //Si encontramos la pelicula
    if(indice !== -1){

        //Enviamos un mensaje
        peliculas.splice(indice, 1);

        //Eliminamos el mensaje
        res.json({mensaje: 'Pelicula eliminada correctamente'});
    }else{

        //Enviamos un error si no existe
        res.status(404).json({mensaje: 'Pelicula no encontrada'})
    }
});

//
app.listen(PORT, () => {

    //Mostramos un mensaje en la terminal
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});