import { response } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../model/user.js';
import {generarJWT} from '../helpers/generar-jwt.js';

const login = async (req, res = response) => {
    const { email, contraseña } = req.body;

    try {
        const user = await Usuario.findOne({ email });

        if (!user) { 
            return res.status(400).json({
                msg: 'El usuario y/o contraseña son incorrectos'
            });
        }

        const passwordValido = bcryptjs.compareSync(contraseña, user.contraseña);
        if (!passwordValido) {
            return res.status(400).json({
                msg: 'El usuario o contraseña no son correctos - password'
            });
        }

        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

export { login };
