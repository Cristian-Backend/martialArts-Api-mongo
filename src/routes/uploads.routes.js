import { Router } from 'express';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validResult.js';
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivos, mostrarImagen } from '../controllers/uploadsController.js';
import { coleccionesPermitidas } from '../middlewares/validar-BD.js';
import {validarArchivoSubir} from '../middlewares/validar-archivo.js'

const router = Router();


router.post('/', validarArchivoSubir, cargarArchivos)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'Debe ser un ID de MongoDB válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['user', 'martialarts'])),
    validarCampos
], actualizarImagenCloudinary)
// actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'Debe ser un ID de MongoDB válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['user', 'martialarts'])),
    validarCampos
], mostrarImagen)


export default router;