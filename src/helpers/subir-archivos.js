import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { dirname } from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const subirArchivo =(files , extensionesPermitidas = ['jpg', 'jpeg', 'png', 'gif'], carpeta = '') => {

    return new Promise((resolve,reject) => { 

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1];
    
        // Extensiones permitidas
        if (!extensionesPermitidas.includes(extension)) {
            return reject(`La extensión del archivo ${extension} no es válida , ${extensionesPermitidas}`)
          
        }
    
    
    // tener identificador unico cada archivo.
        const nombreTemporal = uuidv4() + '.' + extension;
        
        // Ruta de carga del archivo
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemporal);
    
        // Mover archivo a la ruta deseada
        archivo.mv(uploadPath, (err) => {
            if(err) { 
           reject(err);
            }
            resolve(nombreTemporal);
        }); 

    })

   

}


export {
    subirArchivo
}