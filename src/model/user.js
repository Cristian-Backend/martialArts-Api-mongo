import mongoose, { model, Schema } from "mongoose";

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    contraseña: { type: String, required: true },
    
    rol: { 
        type: String, 
        enum: ['usuario', 'admin'], // Puedes agregar más roles si es necesario
        default: 'usuario' 
    },
    img: { type: String}
    
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});


UsuarioSchema.methods.toJSON = function(){
    const {__v , contraseña, _id, ...usuario} = this.toObject() 
    usuario.uid = _id // cambio en mongdb base de datos el id por el UID
   
    return usuario
   }

const Usuario = model("Usuario", UsuarioSchema);

export default Usuario;
