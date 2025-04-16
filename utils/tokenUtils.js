// CLASE JWT (json web token ) , CREACION DE TOKENS
import       jwt       from  'jsonwebtoken'; 
  
export const createJWT = (payload) => {

    // creamos un token con la libreria  jwt.sing()
    // en payload iran los datos a incluir en el token como id ,roles,etc.
    // 'secret' , la clave secreta para firmar el token  
    const token = jwt.sign(payload , process.env.JWT_SECRET,{ // JWT _SECRET y JWT_EXPIRES_IN  lo importamos de la clase .env
        expiresIn: process.env.JWT_EXPIRES_IN,    // tiempo de expiracion del token
    });

    return token;   // devolvemos el JWT token generado
};
    // verificacion de token
export const verifyJWT = (token) => { //con jwt.verify() verificamos el token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    return decoded;
};