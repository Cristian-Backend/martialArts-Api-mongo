import {response} from 'express'

const esAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.user;
    
    if ( rol !== 'admin' ) {
        return res.status(401).json({
            msg: `${ nombre} no es administrador - No puede hacer esto`
        });
    }

    next();
}


const tieneRole = ( ...roles  ) => { // Para poner varios roles
    return (req, res = response, next) => {
        
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.user.rol ) ) { // Si no esta incluido en los roles entonces..
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}


export{
    esAdminRole,
    tieneRole,
    
}