// USER CONTROLLER
import       {StatusCodes}       from  'http-status-codes';
import          userModel        from   '../models/UserModel.js';
import          jobModel         from   '../models/JobModel.js';
import         cloudinary        from   'cloudinary';  // incorporamos cloudinary
import         {promises as fs}  from   'fs';        

export  const getCurrentUser = async (req,res) => {  // ***** obtener el usuario actual
    const user = await userModel.findOne({_id: req.user.userId}); // para obtener el object de userModel
    const userWithoutPassword = user.toJSON(); //   obtenemos el object user sin el password
    res.status(StatusCodes.OK).json({ user: userWithoutPassword});      // mostramos al user

};

export const getApplicationStats = async (req,res) => { // ****** obtener estadisticas de la aplicacion
    // contamos cuantos documentos hay de users y u cuantos de jobs
    const users = await userModel.countDocuments();
    const jobs  = await jobModel.countDocuments();

    res.status(StatusCodes.OK).json({ users, jobs });
};


// podemos actualizar todo menos el password( restringimos la actualizacion de password)
export const updateUser = async (req,res) => {       // ***** actualizar usuario

    //console.log(req.file);    // para ver los datos del file  (aplication of multer)

    const newUser = { ...req.body }; // obtenemos el object user de req.body(de toda la data)
    delete newUser.password;     // escondemos la visibilidad del password
    
    // incorporamos cloudinary for the aplication of images

    if(req.file){
         // Sube la imagen a Cloudinary usando la ruta temporal del archivo
        const response = await cloudinary.v2.uploader.upload(req.file.path);
         // Elimina el archivo temporal del servidor (ya que ahora está en Cloudinary)
        await fs.unlink(req.file.path);
         // Guarda la URL segura de la imagen subida en el objeto newUser
        newUser.avatar = response.secure_url;
        // Guarda el ID público de la imagen (sirve para eliminarla después si es necesario)
        newUser.avatarPublicId = response.public_id;
    };
    
    // llamamos a userModel para utilizar el metodo findBydIdAndUpdate , le enviamos userId  y obj ,luego se realiza la actualizacion
    const  updatedUser = await userModel.findByIdAndUpdate(req.user.userId, newUser);
    
    // Si se subió una nueva imagen Y el usuario anterior tenía un avatar anterior guardado
    if(req.file && updateUser.avatarPublicId){
         // Borra la imagen anterior de Cloudinary usando su public_id
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }


    res.status(StatusCodes.OK).json({ msg:' update user'});
    
};




