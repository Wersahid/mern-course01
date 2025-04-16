// clase para validar la entrada de la data 

import {body, param, validationResult}   from  'express-validator'; // validation de body , param, ....
import { BadRequestError, NotFoundError, UnauthorizedError }        from '../errors/customErrors.js';
import  {JOB_STATUS, JOB_TYPE}              from  '../utils/constants.js';
import             mongoose                 from 'mongoose';  // lo importamos para realizar la invocacion de modulos de validacion
import          jobModel              from  '../models/JobModel.js';
import          userModel             from  '../models/UserModel.js';


const withValidationErrors = (validateValues) => {   // estructura general de validacion
        return [validateValues, (req,res,next) => {
            const errors = validationResult(req); // creamos la const errors 
            if(!errors.isEmpty()){  // si no esta vacio
                const errorMessages = errors.array().map((error) => error.msg);

                if(errorMessages[0].startsWith('no job')){
                    throw new NotFoundError(errorMessages);
                }

                if(errorMessages[0].startsWith('not authorizes')){
                    throw new UnauthorizedError('not authorized to acces this route');
                }

                throw new BadRequestError(errorMessages); // por error se envia un mensaje
            }
            next()
        },
    ];
};


 /*export const validateTest = withValidationErrors([     // se verificara estos atributos al ingresar la data
     // validamos por el nombre tambien mandamos mensaje si esta vacio
      body('name')
     .notEmpty()
     .withMessage('name is required')
     .isLength({min:5 , max: 10})                           // especificamos que el nombre debe estar entre 5 y 10 caracteres
     .withMessage('name must be  between 5 and 10 characters long')
     .trim()                                             // limpiara los espacios en blanco de la data recibida
 ] 
 );*/

 export const validateJobInput = withValidationErrors([ // validacion para el input del Job
     body('company').notEmpty().withMessage('company is required'),  // para inputs unitarias
     body('position').notEmpty().withMessage('position is required'),
     body('jobLocation').notEmpty().withMessage('job location is required'),
 body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
 body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type value')

 ]);

export const validateIdParam = withValidationErrors([  // middlware de validacion de id
    // section que validaremos
    // param es una funcion para validar un parametro
    param('id')
    .custom( async (value,{req}) => {
     const isValidId = mongoose.Types.ObjectId.isValid(value)  // utilizamos el modulo de verificacion de id de mongoose
     if(!isValidId) throw new BadRequestError('invalid MongoDB id')// si la variable isValidId es falsa
          
     // llamamos a jobModel para usar el metodo findByid y busquemos al objeto por el id
     const job = await jobModel.findById(value);
     if(!job) throw new NotFoundError( `no job with id ${value}`); // mostramos por error  NotFoundError  de la clase errors
     
     const isAdmin = req.user.role === 'admin'; // si el usuario que hace la peticion es admin
     const isOwner = req.user.userId === job.createdBy.toString(); // convierte el userId:  de job.createdBy  a string  gracias a el metodo toString() y asi pueda compararlos
     if(!isAdmin && !isOwner)  throw new UnauthorizedError('not authorizes to acces this route'); // sino es admin y tampoco es el usuario que creo el job

    })
   
]);

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
    .notEmpty()     // que no sea vacio
    .withMessage('email is required')
    .isEmail()      // que tenga formato de email
    .withMessage('invalid email format')
    .custom(async (email) => {
        const user = await userModel.findOne({email}); // buscamos el email
        if(user){         // si ya existe el email mandamos un mensaje
            throw new BadRequestError('email already exists');
        }
    }),
    body('password')
    .notEmpty()
    .withMessage('password is requires')
    .isLength({min:8})
    .withMessage('password must be at least 8 characters long '),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required')
]);

export const validateLoginInput = withValidationErrors([
    body('email')
    .notEmpty()     // que no sea vacio
    .withMessage('email is required')
    .isEmail()      // que tenga formato de email
    .withMessage('invalid email format'),
    
    body('password')
    .notEmpty()
    .withMessage('password is requires')

]);
   // validation to update user
export const validateUpdateUserInput = withValidationErrors([

    body('name').notEmpty().withMessage('name is required'),
    body('email')
    .notEmpty()     // que no sea vacio
    .withMessage('email is required')
    .isEmail()      // que tenga formato de email
    .withMessage('invalid email format')
    .custom(async (email,{ req }) => {
        const user = await userModel.findOne({email}); // buscamos el email
        // si el userId encontrado es el mismo que el userId on
        if(user && user._id.toString() !== req.user.userId){         // si ya existe el email mandamos un mensaje
            throw new BadRequestError('email already exists');
        }
    }),
    
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required')
]);

