import express from 'express';
import {check} from 'express-validator';
import { createMartialArt, deleteMartialArt, getMartialArtById, getMartialArts, updateMartialArt } from '../controllers/martialArtsController.js';
import { existeArtePorId } from '../middlewares/validar-BD.js';
import validarCampos from '../middlewares/validResult.js';
import { esAdminRole } from '../middlewares/validar-roles.js';
import validarJWT from '../middlewares/validar-jwt.js';



const router = express.Router()

// API endpoints
router.get('/martials', getMartialArts)

router.get('/martials/:id', [
    check('id', 'no es un mongoid').isMongoId(),
    check('id').custom(existeArtePorId),
    validarCampos,
],getMartialArtById)


router.post('/martials', [
    validarJWT,
    esAdminRole,
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('origen', "el origen es obligatorio").not().isEmpty(),
    check('fundador', "colocar el fundador es obligatorio").not().isEmpty(),
    check('descripcion', "la descripcion es obligatoria").not().isEmpty(),
    check('filosofia', "la filosofia es obligatoria").not().isEmpty(),
    check('tipo', "el tipo es obligatorio").not().isEmpty(),
    validarCampos,

],createMartialArt)

router.put('/martials/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'no es un mongoid').isMongoId(),
    check('id').custom(existeArtePorId),
    validarCampos,
],updateMartialArt)

router.delete('/martials/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'no es un mongoid').isMongoId(),
    check('id').custom(existeArtePorId),
    validarCampos,
 
],deleteMartialArt)



export default router;