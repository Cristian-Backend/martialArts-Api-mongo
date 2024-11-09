import { response } from 'express';
import dotenv from 'dotenv'; // 
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { subirArchivo } from '../helpers/subir-archivos.js';
import ArteMarcial from '../model/arteMarcial.js';
import Usuario from '../model/user.js';
import { v2 as cloudinary } from 'cloudinary';


dotenv.config();  

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cargarArchivos = async (req, res = response) => {
    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });
    } catch (error) {
        console.error(error);
        res.status(400).send('Error al subir el archivo');
    }
};

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case 'user':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe usuario con ese ID' });
            break;

        case 'martialarts':
            modelo = await ArteMarcial.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe este arte con ese ID' });
            break;

        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }

    // Limpiar imágenes previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen); // Eliminar la imagen anterior
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
};



// Actualiar imagen en cloudinary
const actualizarImagenCloudinary = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case 'user':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe usuario con ese ID' });
            break;

        case 'martialarts':
            modelo = await ArteMarcial.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe este arte con ese ID' });
            break;

        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }

    // Limpiar imágenes previas
    if (modelo.img) {
     const nombreArr = modelo.img.split('/');
     const nombre = nombreArr[nombreArr.length - 1];
     // public id de la imagen
     const [public_id]= nombre.split('.')
     await cloudinary.uploader.destroy(public_id); // Eliminar la imagen anterior

    }

    const {tempFilePath} = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo); 
};




const mostrarImagen = async(req,res = response)=> {

    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case 'user':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe usuario con ese ID' });
            break;

        case 'martialarts':
            modelo = await ArteMarcial.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe este arte con ese ID' });
            break;

        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }

    // Limpiar imágenes previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
        return  res.sendFile(pathImagen)
        }
    }
    
    // cuando el usuario no tiene imagen, me retorna esta imagen notfound
    const pathImagen = path.join(__dirname, '../assets/14.1 no-image.jpg.jpg');
    res.sendFile(pathImagen)

}

export {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
};
