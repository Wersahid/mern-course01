// *** MODELADO DE USUARIO ****
import mongoose from "mongoose";

// realizamos el modelado con mongoose schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName'
    },
    location: {
        type: String,
        default: 'mi city'
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    avatar: String,
    avatarPublicId: String,

});
 // funcion para no mostrar el password en los atributos cuando se hace un res
UserSchema.methods.toJSON = function(){
    let obj = this.toObject(); // obtenemos el object
    delete obj.password;       // quitamos el password
    return obj;           

};

// exportamos la clase User,  le damos el nombre de User en la database
export default mongoose.model('User',UserSchema);


