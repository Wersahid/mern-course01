// aplicacion de multer para cargar archivos facilmente
import    multer    from  'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // establece el directorio donde se almacenaran los archivos subidos
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname;

        // establece el mismo directorio del archivo subido
        cb(null, filename);
    }
});

const upload = multer({ storage });




export default  upload;