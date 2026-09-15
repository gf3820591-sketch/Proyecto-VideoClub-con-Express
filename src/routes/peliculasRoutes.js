import { Router } from "express";
import * as ctrl from '../controllers/peliculasController.js';

const router = Router();

router.get('/api/peliculas', ctrl.listar);

router.post('/anadir-pelicula', ctrl.anadir);

router.post('/editar-pelicula', ctrl.editar);

router.delete('/eliminar-pelicula', ctrl.eliminar);

export default router;