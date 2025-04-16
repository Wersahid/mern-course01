// AUTHENTICATION CONTROLLER , register , login.
// Implementacion de hash al password
// implementamos el token , tambien los cookie
import { StatusCodes }   from "http-status-codes";
import       userModel         from  '../models/UserModel.js';
import    {hashPassword, comparePassword}       from  '../utils/passwordUtils.js'; // importamos el middleware de hashPassword 
import    {UnauthenticatedError}  from '../errors/customErrors.js';
import     {createJWT}            from '../utils/tokenUtils.js'; //  para la creacion de tokens

export const register = async (req,res) => {   // *** register ***

    // si es la primera cuenta creada es admin sino es user 
    const isFirstAccount = (await userModel.countDocuments() === 0);
    req.body.role = isFirstAccount? 'admin':'user';

    // < --- en esta parte implementamos el hash al password ------------->
    const newHashedPassword = await hashPassword(req.body.password);   
    req.body.password = newHashedPassword; 
    //< ------------------------------------------------------------------>

    // creamos un user gracias a la importacion de userModel
    const  user = await userModel.create(req.body); // se envia la data de req.body

    //como respuesta mostrados el estado de creado y , el usuario creado
    res.status(StatusCodes.CREATED).json({message: 'user created'});

};


export const login = async (req,res) => { // *** autentication of login *** 
    const user = await userModel.findOne({email:req.body.email});// busca el email en la db de [ userModel ] 
                     
    // el valor de user and si comparePassword se cumple
    const isValidUser = user && (await comparePassword(req.body.password, user.password)); // compara el password con algun [ password de la db de userModel ]
    if(!isValidUser) throw new UnauthenticatedError('invalid credentials'); // si no coincide alguno de los 2 valores

                                                                            // enviamos al metodo comparePassword los datos
    //const isPasswordCorrect = await comparePassword(req.body.password, user.password);// body.password  y user.password
    //if(!user) throw new UnauthenticatedError('invalid credentials'); // sino coinciden los passwords

    //si la validacion es correcta pasara a esta seccion a la generacion del token   //**** CREACION DEL TOKEN  ******/
    const token = createJWT({userId: user._id, role: user.role}); // llamamos al metodo createJWT para la creacion del token,
                                                                  // enviamos los datos user.id y user.role


    // despues de verificar que sean validas las credenciales y crear el token se creara la cookie
    //<------- creacion de cookie ----->                          
    const oneDay = 1000*60*60*24;
    res.cookie('token', token,{                                   // *** COOKIE ****
        httpOnly:true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
    });
    //<-------------------------------->
    
       res.status(StatusCodes.OK).json({msg:'user logged in'}) // como respuesta mandamos mensaje de logueado
} ;

// creamos la funcion de logout 
export const logout = (req,res) => {
    res.cookie('token','logout',{    // creamos el cookie
        httpOnly:true,
        expires: new Date(Date.now()),  // expiracion de la cookie ahora
    });
    res.status(StatusCodes.OK).json({message: ' user logged out '})

};