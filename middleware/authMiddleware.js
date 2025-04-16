// authentication middleware 
// Validacion de cookies
import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import  { verifyJWT }         from "../utils/tokenUtils.js"; // importamos , para solicitar verificar el token

export const authenticateUser = (req,res,next) => {     // (de aca borramos async tener en cuenta).
  const {token} = req.cookies;  // obtenemos la cookies

  if(!token) throw new UnauthenticatedError('authentication invalid') // si la cookie es invalida
  try {
    const { userId, role } = verifyJWT(token); // llamamos al metodo verifyJWT(). y le enviamoe el token
    const testUser =  userId === '67f7eb6d07829d2b79186c12'; // ##### implementamos el id del demo user ,para validar el demo user #####
    req.user = { userId, role, testUser};                    // *** incrementamos (testUser) para validar el demo user
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid') // si la cookie es invalida
  }

};

// middeware para autorizar al admin , visualizar la cantidad de documentos de las clases,users,jobs, etc.
export const authorizePermissions = ( ...roles) => {
  return(req,res,next) => {
    if(!roles.includes(req.user.role)){
      throw new UnauthorizedError('Unauthorized to access this route')
    }
  
    console.log(roles);  // mostrara el rol del user por consola
    next();            // continuara con los procesos
    
  };
};

// ####### validacion check  demo user   #######
export const checkForTestUser = (req,user,next) => {
  if(req.user.testUser) throw new BadRequestError('Demo user Read Only !')
    next();
};