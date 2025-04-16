import       bcrypt         from   'bcryptjs'; // importamos el bcryptjs para implementar el hash en el  password

export const hashPassword = async (password) => {  
    const salt = await bcrypt.genSalt(10);  // creamos una const con la libreria bcrypt y la function genSalt
    const passwordHashed = await bcrypt.hash(password, salt); // generamos el has en la const hashedPassword
    return passwordHashed;
};

export const comparePassword = async (password, hashPassword) => {

    // se envian ambos datos para que se comparen en el metodo bcypt.compare
    const isMatch = await bcrypt.compare(password,hashPassword); // se almacenara el valor en isMatch
    return isMatch;
}
