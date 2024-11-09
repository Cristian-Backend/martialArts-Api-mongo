import arteMarcial from '../model/arteMarcial.js'
import mongoose from 'mongoose';

// obtener todas las artes marciales
const getMartialArts = async (req, res) => {
    try {
        const artesMarciales = await arteMarcial.find(); // Obtiene todas las artes marciales
        const totalArts = await arteMarcial.countDocuments(); // Cuenta el total de documentos

        res.status(200).json({ totalArts ,artesMarciales});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al obtener las artes marciales');
    }
}

// obtener por ID
const getMartialArtById = async (req, res) => {
    const { id } = req.params;

    try {
        const martialArt = await arteMarcial.findById(id);

        if (!martialArt) return res.status(404).json({ message: 'Arte marcial no encontrado' });

        res.status(200).json(martialArt);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al obtener la arte marcial');
    }
};


// crear una arte marcial
const createMartialArt = async (req, res) => {
    const { nombre, origen, fundador, año_creacion, descripcion, filosofia, tipo } = req.body;

    try {
        const dataMartialArt = {
            nombre,
            origen,
            fundador,
            año_creacion,
            descripcion,
            filosofia,
            tipo
        };

        // Renombrar la variable de la instancia para evitar conflicto
        const nuevoArteMarcial = new arteMarcial(dataMartialArt);

        // Guardar en la base de datos
        await nuevoArteMarcial.save();

        // Enviar respuesta después de guardar
        res.status(201).json(nuevoArteMarcial);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al crear la arte marcial');
    }
};


// actualizar una arte marcial
const updateMartialArt = async (req,res) => {
    const {id} = req.params;
    try {
        const martialArt = await arteMarcial.findByIdAndUpdate(id, req.body, {new: true})

        if(! martialArt){
            return res.status(404).json({message: 'Arte marcial no encontrado'})
        }
        res.status(200).json(martialArt);

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error al actualizar la arte marcial')
        
    }
}


// eliminar una arte marcial
const deleteMartialArt= async (req,res) => {

    const {id} = req.params;
    try {
        const martialArt = await arteMarcial.findByIdAndDelete(id)
        
        if(!martialArt) {
            return res.status(404).json({message: 'Arte marcial no encontrado'})
        }
        res.status(200).json({message: 'Arte marcial eliminado'})


        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error al eliminar la arte marcial')
        
    }
  
}

export{
    getMartialArts,
    getMartialArtById,
    createMartialArt,
    updateMartialArt,
    deleteMartialArt
}