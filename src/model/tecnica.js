import { Schema } from 'mongoose';

const TecnicaBasicaSchema = new Schema({
    nombre: { type: String, required: true, unique: true }, // Nombre de la técnica básica
    arteMarcial: { type: Schema.Types.ObjectId, ref: 'ArteMarcial', required: true }, // Referencia al arte marcial
    descripcion: { type: String, required: true }, // Descripción detallada de la técnica
    dificultad: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true 
    }, // Dificultad de la técnica en una escala del 1 al 5
    aplicacion: { type: String }, // Situaciones o contextos en los que se puede aplicar
});

// Exportar el modelo
export default mongoose.model('TecnicaBasica', TecnicaBasicaSchema);
