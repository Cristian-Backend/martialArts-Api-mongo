import { Router } from 'express';
import { login } from '../controllers/auth.login.js';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validResult.js';

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

export default router;