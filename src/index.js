import express from 'express'
import dbConnection from './database/db.js'
import dotenv from 'dotenv';
import martialRoutes from './routes/martial.routes.js'
import userRoutes from './routes/usuarios.routes.js'
import authRoutes from './routes/auth.routes.js'
import uploadRoutes from './routes/uploads.routes.js'
import fileUpload from 'express-fileupload';
import cors from 'cors'
import morgan from'morgan'



dotenv.config();

const app = express()

app.use(express.static('public'));

const allowedOrigins = [
    'http://127.0.0.1:5500',  // Tu frontend local
    'http://localhost:3000',   // Si tienes otro entorno de desarrollo
    'https://martialarts-api-mongo.onrender.com/'  // API en producción
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));



app.use(morgan('dev'));

app.use(express.json())

//Fileuploads - Carga de archivos 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));

// rutas
app.use('/api', martialRoutes)
app.use('/api', userRoutes)
app.use('/auth', authRoutes)
app.use('/api/uploads', uploadRoutes)


const PORT = process.env.PORT || 3000;

dbConnection()

app.listen(PORT,()=> {
    console.log('Server is running on port ',PORT)
})