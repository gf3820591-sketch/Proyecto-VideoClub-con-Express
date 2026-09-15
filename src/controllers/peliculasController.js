import * as Pelicula from '../models/peliculasModels.js';

export const listar = (req, res) => {
    const peliculas = Pelicula.getAll();
    res.json(peliculas);
};

export const anadir = (req, res) => {
    const {titulo, director, anio, imagen} = req.body;

    if(!titulo || !director || !anio || !imagen){
        return res.status(400).send('Faltan datos obligatorios');
    }

    Pelicula.create(titulo, director, anio, imagen);

    res.redirect('/?mensaje=añadida');
};

export const editar = (req, res) => {
    const {id, titulo, director, anio, imagen} = req.body;

    const resultado = Pelicula.update(
        id,
        titulo,
        director,
        anio,
        imagen
    );

    if(!resultado){
        return res.status(404).send('Pelicula no encontrada');
    }

    res.redirect('/?mensaje=editada');
}

export const eliminar = (req, res) => {
    const {id} = req.body;

    const eliminado = Pelicula.remove(id);

    if(!eliminado){
        return res.status(404).json({ error: 'Pelicula no encontrada'});
    }

    res.json({ mensaje: 'Pelicula eliminada correctamente'});
};