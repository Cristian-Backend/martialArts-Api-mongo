# API de Artes Marciales

Esta es una API RESTful para gestionar información relacionada con las artes marciales. Permite realizar operaciones CRUD sobre las artes marciales, usuarios y archivos. Está construida con Node.js y Express, utilizando MongoDB como base de datos y Cloudinary para la gestión de imágenes.

## Índice

- [Características](#características)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Rutas de la API](#rutas-de-la-api)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Características

- Gestión de artes marciales: crear, leer, actualizar y eliminar.
- Autenticación de usuarios mediante JWT (JSON Web Token).
- Roles de usuario para proteger rutas y realizar ciertas acciones.
- Carga y actualización de imágenes de artes marciales y usuarios utilizando Cloudinary.
- Validación de datos de entrada con `express-validator`.
- Manejo de archivos con `express-fileupload`.
- Middleware para la gestión de roles y verificación de JWT.
  
## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución JavaScript.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL.
- **Cloudinary**: Almacenamiento de imágenes en la nube.
- **bcryptjs**: Encriptación de contraseñas.
- **jsonwebtoken**: Autenticación mediante tokens JWT.
- **express-validator**: Validación de datos.
- **dotenv**: Manejo de variables de entorno.
- **morgan**: Middleware de logging para las peticiones HTTP.
- **express-fileupload**: Middleware para subir archivos.
- **uuid**: Generación de identificadores únicos.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/api-artesmarciales.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd api-artesmarciales
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

    ```bash
    MONGODB_URI=mongodb://<usuario>:<contraseña>@<cluster>.mongodb.net/<base-de-datos>?retryWrites=true&w=majority
    SECRETORPRIVATEKEY=<tu_clave_secreta>
    CLOUDINARY_URL=<url_de_cloudinary>
    CLOUDINARY_CLOUD_NAME=<tu_nombre_de_nube_de_cloudinary>
    CLOUDINARY_API_KEY=<tu_api_key_de_cloudinary>
    CLOUDINARY_API_SECRET=<tu_api_secret_de_cloudinary>
    ```

## Configuración

Asegúrate de tener las siguientes configuraciones:

- **MongoDB**: Necesitarás una cuenta de MongoDB y una base de datos configurada. Obtén la URI de conexión de tu base de datos y colócala en el archivo `.env`. El archivo de configuración para la conexión en tu código es el siguiente:

    ```javascript
    import mongoose from "mongoose";
    
    // Conexión a MongoDB
    const dbConnection = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                family: 4
            });

            console.log('BASE DE DATOS ONLINE');
        } catch (error) {
            console.error('Error al iniciar la base de datos:', error.message);
            throw new Error('Error al iniciar la base de datos');
        }
    };

    export default dbConnection;
    ```

- **Cloudinary**: Regístrate en [Cloudinary](https://cloudinary.com/) para obtener tus credenciales (cloud_name, api_key, api_secret).

## Uso

1. Para iniciar el servidor en modo de desarrollo con `nodemon`:

    ```bash
    npm run dev
    ```

2. Para iniciar el servidor en modo producción:

    ```bash
    npm start
    ```

El servidor estará corriendo en `http://localhost:3000` por defecto.

## Rutas de la API

### Rutas de autenticación

- **POST /auth/login**: Iniciar sesión (requiere `email` y `contraseña`).
  
### Rutas de artes marciales

- **GET /martials**: Obtener todas las artes marciales.
- **GET /martials/:id**: Obtener una arte marcial por ID.
- **POST /martials**: Crear una nueva arte marcial (requiere autenticación y ser admin).
- **PUT /martials/:id**: Actualizar una arte marcial por ID (requiere autenticación y ser admin).
- **DELETE /martials/:id**: Eliminar una arte marcial por ID (requiere autenticación y ser admin).

### Rutas de usuarios

- **GET /users**: Obtener todos los usuarios (requiere autenticación y ser admin).
- **GET /users/:id**: Obtener un usuario por ID (requiere autenticación y ser admin).
- **POST /users**: Crear un nuevo usuario (requiere autenticación y ser admin).
- **PUT /users/:id**: Actualizar un usuario por ID (requiere autenticación y ser admin).
- **DELETE /users/:id**: Eliminar un usuario por ID (requiere autenticación y ser admin).

### Rutas de archivos (Uploads)

- **POST /uploads**: Subir un archivo.
- **PUT /uploads/:coleccion/:id**: Actualizar una imagen (requiere ID válido y colección permitida).
- **GET /uploads/:coleccion/:id**: Obtener una imagen (requiere ID válido y colección permitida).

## Contribuir

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Forkea el repositorio.
2. Crea una rama con tu característica o corrección de error (`git checkout -b feature/nueva-caracteristica`).
3. Realiza los cambios y haz commit (`git commit -am 'Agregué nueva característica'`).
4. Envía tus cambios a tu rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la [Licencia ISC](https://opensource.org/licenses/ISC).
