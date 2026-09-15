let peliculas = [
    { id: Date.now(), titulo: 'Terminator 2: El juicio final', director: ' James Cameron', anio: 1991, imagen: '/img/terminator.jpeg' },
    { id: Date.now() + 1, titulo: 'Aliens: El regreso', director: 'James Cameron', anio: 1986, imagen: '/img/aliens_el_regreso_posters.png'},
    { id: Date.now() + 2, titulo: 'The Avengers: Los Vengadores', director: 'Joss Whedon', anio: 2012, imagen: '/img/avengers.jpg' },
    { id: Date.now() + 3, titulo: 'Misión: Imposible', director: 'Christopher McQuarrie,', anio: 2018, imagen: '/img/mision-imposible.jpg' },
    { id: Date.now() + 4, titulo: 'Spider-Man', director: 'Sam Raimi', anio: 2002, imagen: '/img/spyderman.jpeg'},
    { id: Date.now() + 5, titulo: 'Spider-Man: Brand New Day', director: 'Destin Daniel', anio: 2026, imagen: '/img/brand.jpeg'}
];

export const getAll = () => {
    return peliculas;
};

export const getById = (id) => {
    return peliculas.find(pelicula => pelicula.id === Number(id));
};

export const create = (titulo, director, anio, imagen) => {
    const nuevaPelicula = {
        id: Date.now(),
        titulo,
        director,
        anio: Number(anio),
        imagen
    };

    peliculas.push(nuevaPelicula);
    
    return nuevaPelicula;
};

export const update = (id, titulo, director, anio, imagen) => {
    const indice = peliculas.findIndex(
        pelicula => pelicula.id === Number(id)
    );

    if(indice === -1){
        return null;
    }

    peliculas[indice] = {
        id: Number(id),
        titulo,
        director,
        anio: Number(anio),
        imagen
    };

    return peliculas[indice];
};

export const remove = (id) => {
    const antes = peliculas.length;

    peliculas = peliculas.filter(
        pelicula => pelicula.id !== Number(id)
    );

    return peliculas.length < antes;
};