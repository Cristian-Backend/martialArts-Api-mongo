import { response } from "express"


// middleware si no se sube ningun archivo.
const validarArchivoSubir = (req, res= response, next)=> {

        // Verificación de archivos
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            return res.status(400).json({msg : "No hay archivo a subir - validarArchivoSubir"} );
        }
        next()

}


export {
    validarArchivoSubir
}

