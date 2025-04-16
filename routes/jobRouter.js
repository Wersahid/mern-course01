// clase para definir los tipos de metodos que usaremos para los controladores get,patch,post,etc tambien se definiran las rutas
import  { Router } from  'express';
const router = Router(); //hacemos uso de Router()

// importamos todos los controllers  de jobController que utilizaremos 
import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob ,
    showStats     // %%%% stats %%%%%     
 }  from  '../controllers/jobController.js';
 import    { validateJobInput , validateIdParam}      from   '../middleware/validationMiddleware.js';  // importamos el validator middleware
 import      {checkForTestUser}                       from   '../middleware/authMiddleware.js';   //  ##### importamos el check validation demo user  #######


// -- aca especificamos por el metodo que enviaremos el controlador ya sea get, post, etc.----
// ######## implementamos checkForTestUser para validar el demo user  #########
 router.route('/').get(getAllJobs).post(checkForTestUser,validateJobInput,createJob); // podemos concatenar peticiones  , incorporamos el validateinput

router.route('/stats').get(showStats);   // %%%%% stats %%%%%

                                    // o hacerlas de manera separada
 router.route('/:id').get(validateIdParam, getJob)
 router.route('/:id').patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)    // incorporamos el validateinput
 router.route('/:id').delete(checkForTestUser, validateIdParam, deleteJob);



 // exportamos por defecto el router
 export default router;