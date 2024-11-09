import Usuario from '../model/user.js'
import bcryptjs from 'bcryptjs'


//obtener usuarios
const getUsers = async(req,res) => {
    try {
        const users = await Usuario.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al obtener los usuarios');
    }
}

// obtener un usuario por id
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Usuario.findById(id);
        
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Enviar la respuesta con el usuario encontrado
        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al obtener el usuario');
    }
};


// crear usuario
const createUser = async(req,res) => {
    const {nombre,email,contraseña,rol} =req.body;
    try {
        const userdata = {
            nombre,
            email,
            contraseña,
            rol
        }
        
        const newUser = new Usuario(userdata);

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync(); // numero de vueltas por defecto es 10
    newUser.contraseña = bcryptjs.hashSync( contraseña, salt );
        
        await newUser.save(
            res.status(201).json(newUser)
        );
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al crear el usuario');
        
    }
}


// actualizar usuario
const updateUser = async (req,res)=>{
    const {id} =req.params;
    try {
        const user = await Usuario.findByIdAndUpdate(id, req.body, {new: true});
        if (!user) return res.status(404).json({msg: 'Usuario no encontrado'});
        
        res.json(user);

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al actualizar el usuario');
        
    }
}

//eliminar usuario
const deleteUser = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await Usuario.findByIdAndDelete(id);
        if (!user) return res.status(404).json({msg: 'Usuario no encontrado'});
        
        res.json({msg: 'Usuario eliminado'});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al eliminar el usuario');
        
    }
}


export{
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser
}