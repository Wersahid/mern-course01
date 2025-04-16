// **** Controllers de get, post, delete, etc , *******
// las tenemos aca y luego  las exportamos
// Los metodos find , findById , findByIdAndDelete, findByIdAndUpdate, son metodos de MONGOOSE
import { nanoid }      from 'nanoid';   // importamos nandoid para generar un id unico es como UUID
import   jobModel      from  '../models/JobModel.js';
import   { json }      from 'express';
import {  StatusCodes } from 'http-status-codes';
import     Mongoose    from 'mongoose';   // %%% stats %%%%
import       day       from 'dayjs';      // %%% stats %%%%
import     mongoose from 'mongoose';


// let jobs =[       // array de objetos, jobs
//     {
//         id: nanoid(),           // implementamos el nanoid
//         company: 'apple',
//         position: 'front-end'
//     },
//     {
//         id: nanoid(),           // implementamos el nandoid
//         company: 'google',
//         position: 'back-end'
//     }
// ];
// ----- create, delete,update directamente con la base de datos -----

export const createJob =async (req,res) => { // *** CREATE JOB ****

    req.body.createdBy = req.user.userId; //  createdBy obtendra el valor del userId del usuario: , (quien crea el job)
                                          // se mostrara createdBy: en los atributos del object

    //const {company, position} = req.body; // obtenemos los valores ,company,and request de la data body
       
    // creamos una constante que sera la data obtenida por el join
    // del jobModel del import obtenido llamamos a la clase jobModel y le enviamos company,position, para crear el job
    const jobs = await jobModel.create(req.body);   // de req,body obtendremos el company y el position y se lo enviaremos 
    res.status(201).json({msg: `job created`,jobs}); // si se cumple el join mostramos la data creada
};

export const getAllJobs = async (req,res) => { // ** mostrar todos los objetos ***
 
     // Extrae el parámetro "search" de la URL (por ejemplo: /jobs?search=developer)
    const  { search, jobStatus, jobType, sort } = req.query;    // implementamos sort para su uso en las busquedas

    // Se crea un objeto de consulta para buscar solo los trabajos creados por el usuario autenticado.
    const queryObject = {
        createdBy: req.user.userId,

    };

    // Verifica si el usuario envió un parámetro de búsqueda en la URL (?search=algo)
    if(search){
        queryObject.$or = [
            // Condición 1: el campo "position" contiene el texto de búsqueda
             // Se usa $regex para coincidencias parciales y $options: 'i' para ignorar mayúsculas/minúsculas
             {position: { $regex:search, $options: 'i'}},   

             // Condición 2: el campo "company" contiene el texto de búsqueda
             // También con coincidencia parcial y sin importar mayúsculas/minúsculas
             {company:  { $regex:search, $options: 'i'}}
        ];
    };

    if(jobStatus && jobStatus !== 'all'){     // search jobStatus all class
        queryObject.jobStatus = jobStatus;
    }

    if(jobType && jobType !== 'all'){          // search jobType all class
        queryObject.jobType = jobType;
    }

     const sortOptions = {  // definimos las variables para el tipo de ordenacion (busqueda)
         newest: '-createdAt',
         oldest: 'createdAt',
         'a-z':  'position',
         'z-a':  '-position'
     };

     const sortKey = sortOptions[sort] || sortOptions.newest;    //variable de tipo object con las variables de busqueda

     // setup pagination
     const page = Number(req.query.page) || 1;    // numero de paginas que se muestra
     const limit = Number(req.query.limit) || 10;  // cantidad de objects a mostrar por pagina
     const skip = (page - 1) * limit;               // Calcula cuántos documentos se deben omitir para mostrar la página actual.

     // Se realiza la búsqueda en la base de datos MongoDB usando el modelo `jobModel` con las condiciones definidas.
    const jobs = await jobModel.find( queryObject ).sort(sortKey).skip(skip).limit(limit); // implementamos el .sort(sortKey) para realizar la busqueda definida ,skip sirve para mostrar objects con saltos 
   
    const totalJobs = await jobModel.countDocuments(queryObject); // contamos cuantos objects de la busqueda tenemos
    const numOfPages = Math.ceil( totalJobs/limit );       // calcula cuantas paginas se necesitan en total, con Math.ceil redondea hacia arriba
    res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage:page, jobs})  // mostramos la data , utilizamos la libreria statusCodes

    


    //****** parte functional ********/
    // const jobs = await jobModel.find({
    //     createdBy: req.user.userId,
    //     position: req.query.search   // @@@@ implementamos para usar la query params @@@@@  , buscara entre los jobs la position especificada, con query buscamos
    // });  // mostrara el los jobs creados por el usuario, los buscara en la databse  por el userId: 
    
    // res.status(StatusCodes.OK).json({jobs})  // mostramos la data               , utilizamos la libreria statusCodes
    //****************************** */
};

export const getJob = async (req,res) => { // *** mostrar un objeto por el id ***
   // console.log(req.user); // <--- ////  nos mostrara el userId: y rol del usuario
    //const {id} = req.params; // obtenemos el params 

    // llamamos a jobModel para usar el metodo findByid y busquemos al objeto por el id
    const jobs = await jobModel.findById(req.params.id); // obtenemos de manera directa el params con req.params.id
    res.status(200).json({ jobs });
};

export const deleteJob = async (req,res) => { // *** para eliminar un object por su id *******
    
    // buscamos por el id con el metodo findByIdAndDelete y eliminamos el object
    const removedJob = await jobModel.findByIdAndDelete(req.params.id); // obtenemos de manera directa el id

    res.status(200).json({msg: `job deleted`,jobs: removedJob})// si se elimino exitosamente el object ,nos mostrara el objecto eliminado
}

export const updateJob = async (req,res) => {
   // const {id} = req.params;

       // realizamos un update gracias al metodo findByIdAndUpdate enviandole nuestro id y los datos a reemplazar
    const updateJob = await jobModel.findByIdAndUpdate(req.params.id, req.body, {    // en req.body se encuentran los valores que enviaremos para reemplazarlos
         new: true,                                          // actualiza inmediatamente la base de datos
    }); 
    res.status(200).json({msg:'job updated', jobs:updateJob});
};

// %%%%%% stats controler %%%%%%%
export  const showStats = async (req,res) => {
 
// Ejecutamos una agregación sobre el modelo jobModel para obtener estadísticas
 let stats = await jobModel.aggregate([
    // Primer paso del pipeline: filtramos solo los trabajos creados por el usuario actual
     { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
     // Segundo paso: agrupamos los trabajos por su estado (jobStatus) y contamos cuántos hay de cada uno
     { $group: { _id: '$jobStatus', count: {$sum: 1 }}}
 ]);
    // Reducimos el array de resultados a un objeto con clave = estado (jobStatus) y valor = cantidad
     stats = stats.reduce((acc, curr) =>  {
        const { _id: title, count } = curr; // Desestructuramos para obtener el nombre del estado y su cantidad
        acc[title] = count;         // Agregamos el estado como clave y su conteo como valor
        return acc;       // Retornamos el acumulador para seguir construyéndolo
        
     }, {} );
     // Creamos un objeto defaultStats para asegurar que siempre tengamos estos tres estados, aunque no existan en la DB
    const defaultStats = {
        pending:stats.pending || 0,     // Si no hay trabajos "pending", se asigna 0
        interview: stats.interview || 0,  // Igual para "interview"
        declined: stats.declined || 0,    // Igual para "declined"
    };

    // Hacemos una agregación en la base de datos con mongoose (MongoDB) para obtener las aplicaciones por mes
    let monthlyApplications = await jobModel.aggregate([

          // Paso 1: Filtramos los trabajos que fueron creados por el usuario actual
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        
          // Paso 2: Agrupamos por año y mes del campo 'createdAt', y contamos cuántos hay por cada grupo
        { $group: { _id: { year: { $year: '$createdAt'}, month: { $month: '$createdAt'}}, count: { $sum: 1}}},

        // Paso 3: Ordenamos los resultados desde el mes más reciente al más antiguo
        { $sort: { '_id.year': -1, '_id.month': -1 } },

         // Paso 4: Limitamos los resultados a los últimos 6 meses
        { $limit: 6}
    ]);
    // Luego, transformamos los datos para que sean más fáciles de mostrar en el frontend
    monthlyApplications = monthlyApplications.map((item) => {

        const {_id: {year, month}, count} = item   // Sacamos el año, mes y cantidad de aplicaciones

        // Usamos la librería 'dayjs' (se llama 'day') para formatear la fecha como "Abr 25", "Mar 25", etc.
        const date = day().month(month -1).year(year).format('MMM YY') // Ojo: los meses en JS empiezan en 0

        return { date, count };  // Devolvemos un objeto con la fecha formateada y el número de aplicaciones
        
    }).reverse();        // Damos vuelta el array para que el orden sea del más antiguo al más reciente






    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications});``
};







//******************
// exportamos  el get de mostrar todos los objetos trabajo
// export const getAllJobs = async (req,res) => {                                                                                // get
//     res.status(200).json({jobs});     // enviamos al cliente nuestro array de objetos jobs
// };


// exportamos el post de crear jobs
// export const createJob = async (req,res) => {    // recibe los datos de un nuevo trabajo del cliente                          //post
//     const {company, position} = req.body;
//     if(!company || !position){              // en caso de que el cliente solo envie un valor nos mandara un mensaje de error
//         return res.status(400).json({message: 'please provide company and position'})
//     }
//     const id = nanoid();              // creamos un id con nanoid()
//     const job = {id, company, position};  // creamos un objeto con las caracteristicas id,company,position
//     jobs.push(job);                     // con push introducimos el objeto creado a nuestro array de objetos

//     res.status(200).json({job});    
// };

// exportamos el get de un solo job
// export const getJob = async (req,res) => {                                                                                   // get
//     const {id} = req.params;           // atrapamos el valor de param en la variable id , atrapa solamente id, porque utilizamos desestructuring
//     const x = jobs.find((parametroCallback) => parametroCallback.id === id); // comparamos el id atrapado con los del array, la variable
//     if(!x){      
        
//         throw new Error('no job with that id')  // el codigo solo se ejecutara hasta aqui y se mostrara el mensaje
//                                      // si no existe el id mandamos un mensaje de error
//         return res.status(404).json({message: `no job with id ${id}`});
//     }
//     res.status(200).json({x});       // si existe se muestra la data de la peticion por el id

// };

// exportamos el editar un job
// export const updateJob = async (req,res) => {                                                  // patch
//     const { company , position} = req.body;    // obtenemos los valores company, position del body de la data
//     if(!company || !position){               // si no se introducen ambos datos
//         return res.status(400).json({message:' please provide company and position'})
//     }                                        
//     const { id } =req.params;     // obtenemos el id de params, de manera desestructuring (la manera adecuada)
    
//     // comparamos el id obtenido con los ids del array que tenemos, la variable w sera de tipo booleado
//     const w = jobs.find((arrayParameter) => arrayParameter.id === id);  // w sera un nuevo array que contendra los objetos de jobs
//     if(!w){                   // si es falso mandamos un mensaje
//         return res.status(404).json({ message: `No job with id ${id}` });
//     }
//             // si es verdad reemplazamos lo valores company y position por los nuevos obtenidos
//     w.company = company;
//     w.position = position;
    
//     res.status(200).json({ message: `job modified`,w});   // por verdad mandamos un mensaje y mostramos la data de el id encontrado
// };

// exportamos delete job
// export const deleteJob = async (req,res) => {                                                // delete
// const {id} = req.params;    // obtenemos el params id
// const w = jobs.find((internalArray) => internalArray.id === id); // w sera nuestra array , preguntamos si el id que tenemos se encuentra en el array
//    if(!w){                  // si no se encuentra el id en el array
//         return res.status(404).json({message: `job no found with id ${id}`})
//    }
//    const newJobs = jobs.filter((internalArray) => internalArray.id !== id); // si se encuentra el id, hacemos un filter del array , y guardamos en un nuevo array sin el id que se encontro
//    jobs = newJobs;                                                          // el antiguo array obtiene los objetos del nuevo array sin el id eliminado
//    res.status(200).json({message: 'Job deleted '});
// };

