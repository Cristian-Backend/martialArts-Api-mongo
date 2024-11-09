import {model, Schema} from 'mongoose'

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'] // si no coloco el nombre, se lanza ese mensaje.
    }})


    export default model('Role',RoleSchema)
