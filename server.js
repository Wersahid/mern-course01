// Important  
import    'express-async-errors';   // para manejo de errores asi nos evitamos usar try catch.
import  * as dotenv   from 'dotenv' // importamos dotenv para envolver el codigo **
import express, { json }   from   'express';   // llamamos a express
import morgan         from   'morgan'; // para darle formato a la data por consola.
import mongoose       from 'mongoose';  // importamos mongoose para conectarnos a la base de datos
import   cookieParser  from   'cookie-parser';   // cookie   
import    cloudinary    from  'cloudinary';   // para administrar the images in la nube
import     helmet       from  'helmet';    // security packages
import    mongSanitize  from  'express-mongo-sanitize'; // security packages


dotenv.config();     // establecemos dotenv
const app = express();    // utilizamos a express

// routers    , importamos la clase jobRouter,authRouter  donde se importo los controladores y se expecifico los metodos de peticion
import    jobRouter    from  './routes/jobRouter.js';               // <----------------------------
import   authRouter    from  './routes/authRouter.js';
import   userRouter    from  './routes/userRouter.js';   // importamos el userRouter

import          {dirname}       from   'path';
import      { fileURLToPath }   from  'url';
import           path           from  'path';        

// middleware errorHandlerMiddleware
import          errorHandlerMiddleware     from './middleware/errorHandlerMiddleware.js'; 
import          {  authenticateUser }         from './middleware/authMiddleware.js'; // authenticate middlware user

import           {body, validationResult}   from  'express-validator'; // para validar la data (validator)
                    
                    // importamos la validacion que creamos en middleware -> validationMiddleware.js



    // *** fetch API  ****
// try {
//     const response = await fetch('https://www.course-api.com/react-useReducer-cart-project');
//     const cartData = await response.json();
//     console.log(cartData);
    
// } catch (error) {

//     console.log(error);   
// }

// incorporamos cloudinary para administrar nuestras imagenes en la nube
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });



//__dirname extrae el directorio padre de una ruta de archivo, fileURLToPath convierte la URL del archivo ,import.meta.url: Proporciona la URL completa del módulo actual
const __dirname = dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));   // especificamos que usaremos morgan en su formato 'dev'

}


                            // express.static: Middleware de Express para servir archivos estáticos (HTML, CSS, JS, imágenes, etc.).
                            // path.resolve: Resuelve rutas de archivos, manejando correctamente las diferencias entre sistemas operativos (barras / vs \).
                            // './public': Es el directorio donde se encuentran los archivos estáticos, relativo a __dirname.
app.use(express.static(path.resolve(__dirname, './client/dist')));
app.use(cookieParser()); // utilizamos cookieParser para verificar las cookies
app.use(express.json());  // especificamos que utilizaremos el formato json 
app.use(helmet());      // security packages   
app.use(mongSanitize()); // security packages





// -------- Aca llamamos a todas las peticiones get,post,delete,etc, Implementamos jobRouter que son las rutas definidas
app.use('/api/v1/jobs', authenticateUser, jobRouter); // job routes
app.use('/api/v1/users',authenticateUser, userRouter); // user routes                         // <------------------------
app.use('/api/v1/auth',authRouter)   // importamos el router de authentication

// para mostrar por el lado del client un vez hecho build
app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname, './client/dist','index.html'));
});


// NO FOUND MIDDLEWARE     // para cualquier error en las rutas (url), mostraremos un mensaje
app.use('*',(req,res) => {
    res.status(404),json({message: 'Not found'}); // mensaje mostrado
})

// introducimos el error importado middleware -> errorHandlerMiddleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100   // establecemos  port=5100


// ****** CONEXION CON LA BASE DE DATOS  MONGODB **************
try {
    await mongoose.connect(process.env.MONGO_URL); // para realizar la conexion
    
    //puerto por el que escuchara express
    app.listen(port, () => {
       console.log(`server running on Port ${port}`);
    });

} catch (error) {
    console.log(error);
    process.exit(1);
}

//********************************************************* */

