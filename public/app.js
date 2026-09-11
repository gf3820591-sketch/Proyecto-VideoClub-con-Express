//Seleccionamos los elementos del HTML 
const formulario = document.querySelector('#form-pelicula');
const listaPeliculas = document.querySelector('#lista-peliculas');
const btnSubmit = document.querySelector('#btn-submit');
const btnCancelar = document.querySelector('#btn-cancelar');
const btnMostrarFormulario = document.querySelector('#btn-mostrar-formulario');

//Mostramos el formulario
btnMostrarFormulario.addEventListener('click', () => {
    formulario.hidden = false;
    btnMostrarFormulario.hidden = true;
});

//Cargamos las peliculas
function cargarPeliculas(){
    fetch('/api/peliculas')
    .then(res => res.json())
    .then(peliculas => {
        //Limpiamos la lista
        listaPeliculas.innerHTML = '';

        peliculas.forEach(pelicula => {
            //Creamos una tarjeta
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');

            //Añadimos los datos de la pelicula
            tarjeta.innerHTML = `
                <h3>${pelicula.titulo}</h3>

                <p><strong>Director:</strong>${pelicula.director}</p>
                <p><strong>Año:</strong>${pelicula.anio}</p>
                <button data-id="${pelicula.id}" data-accion="editar">Editar</button>
                <button data-id="${pelicula.id}" data-accion="eliminar">Eliminar</button>
            `;

            listaPeliculas.appendChild(tarjeta);
        });
    });
}

//Detectamos que boton se ha pulsado y ejecutamos su funcion
listaPeliculas.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        const id = Number(event.target.dataset.id);
        const accion = event.target.dataset.accion;

        if(accion === 'editar'){
            editarPelicula(id);
        }

        if(accion === 'eliminar'){
            eliminarPelicula(id);
        }
    }
});

//Editamos una pelicula
function editarPelicula(id){

    //Obtenemos las peliculas
    fetch('/api/peliculas')
    .then(res => res.json())
    .then(peliculas => {

        //Buscamos las peliculas por su ID
        const pelicula = peliculas.find(pelicula => pelicula.id === id);

        if(pelicula){

            //Rellenamos el formulario
            formulario.id.value = pelicula.id;
            formulario.titulo.value = pelicula.titulo;
            formulario.director.value = pelicula.director;
            formulario.anio.value = pelicula.anio;

            //Cambiamos la ruta del formulario
            formulario.action = '/editar-pelicula';

            btnSubmit.textContent = 'Guardar cambios';
            btnCancelar.hidden = false;
            formulario.hidden = false;
            btnMostrarFormulario.hidden = true;
        }
    });
}

//Cancelamos la edicion
btnCancelar.addEventListener('click', () => {

    //Limpiamos el formulario
    formulario.reset();

    // Volvemos a la ruta de añadir
    formulario.action = '/anadir-pelicula';

    // Cambiamos el texto del botón   
    btnSubmit.textContent = 'Añadir pelicula';

    // Ocultamos cancelar    
    btnCancelar.hidden = true;

    // Ocultamos el formulario
    formulario.hidden = true;

    // Mostramos añadir
    btnMostrarFormulario.hidden = false;
});

//Eliminamos una pelicula
function eliminarPelicula(id){

    //Enviamos una peticion DELETE
    fetch('/eliminar-pelicula', {
        method: 'DELETE',

        //Indicamos que enviamos JSON
        headers: {'content-type': 'application/json'
        
        },

        //Enviamos el ID
        body: JSON.stringify({
            id: id
        })
    })

    .then(res => res.json())
    .then(data => {

        //Mostramos la respuesta
        console.log(data);

        //Recargamos las peliculas
        cargarPeliculas();
    });
}

//Cargamos las peliculas al iniciar
cargarPeliculas();