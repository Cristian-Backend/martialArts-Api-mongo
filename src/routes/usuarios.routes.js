import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/usuarioController.js';
import {check}  from 'express-validator'
import validarJWT from '../middlewares/validar-jwt.js';
import { esAdminRole } from '../middlewares/validar-roles.js';
import validarCampos from '../middlewares/validResult.js';
import { existeUsuarioPorID, RoleValido } from '../middlewares/validar-BD.js';

const router = express.Router()

// API endpoints
router.get('/users',[
    validarJWT,
    esAdminRole,
    validarCampos
], getUsers); 

router.get('/users/:id', [
    validarJWT,
    esAdminRole,
    check('id','ID es requerido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos,
],getUserById); 

router.post('/users', [
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('email','El email es invalido').isEmail(),
    check('contraseña','La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
    check('rol').custom(RoleValido),
    validarCampos,
],createUser); 

router.put('/users/:id', [
    validarJWT,
    esAdminRole,
    check('id','ID es requerido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos,
    check('rol').optional().custom(RoleValido)
],updateUser); 

router.delete('/users/:id', [
    validarJWT,
    esAdminRole,
    check('id','ID es requerido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos, 
],deleteUser); 



export default router;