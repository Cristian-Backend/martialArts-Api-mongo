
import arteMarcial from '../model/arteMarcial.js'
import Usuario from '../model/user.js'
import Role from '../model/role.js'



const existeArtePorId = async(id)=> {
    const arteExiste = await arteMarcial.findById(id)

    if (!arteExiste) {
        throw new Error (`el id ${id} no existe`)
    }
}


const existeUsuarioPorID = async(id)=> {
      
    const usuarioExiste = await Usuario.findById(id) // traemos al usuario por ID
    if (!usuarioExiste){
       throw new Error (`el id  ${id} no existe ` )
        }
    }

    const RoleValido = async (rol = '') => {
        const RolExiste = await Role.findOne({ rol })
        if (!RolExiste) { 
            throw new Error(`Este rol no existe en la Base de datos`)
        }
    }


    // validar colecciones permitidas
// Declaración de colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no está permitida. Permitidas: ${colecciones.join(', ')}`);
    }
    return true;
};



export {
    existeArtePorId,
    existeUsuarioPorID,
    RoleValido,
    coleccionesPermitidas
    }
 
