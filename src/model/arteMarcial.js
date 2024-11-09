import mongoose, { model, Schema } from "mongoose";

const ArteMarcialSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    origen: { type: String, required: true },
    fundador: { type: String, default: "" },
    año_creacion: { type: Schema.Types.Mixed, default: null },
    descripcion: { type: String, required: true },
    filosofia: { type: String },
    tipo: { 
        type: String, 
        enum: ['Grappling', 'Striking', 'Mixto', 'Defensivo', 'Otros'], 
        required: true 
    },
    img: { type: String }
});

// Modificación para ocultar __v y renombrar _id a uid
ArteMarcialSchema.methods.toJSON = function() {
    const { __v, _id, ...arteMarcial } = this.toObject();
    arteMarcial.uid = _id; // Renombrar _id a uid
    return arteMarcial;
};

const ArteMarcial = model("ArteMarcial", ArteMarcialSchema);

export default ArteMarcial;
