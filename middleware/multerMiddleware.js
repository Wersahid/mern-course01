// aplicacion de multer para cargar archivos facilmente
import      multer     from  'multer';
import    DataParser   from  'datauri/parser.js';
import       path      from   'path';
const storage = multer.memoryStorage();

const upload = multer({ storage });
const parser = new DataParser();

export  const formatImage = (file) => {
    const fileExtension = path.extname(file.originalname).toString();
    return parser.format(fileExtension, file.buffer).content;
};  

//******* multer functional hasta el capitulo 16 */
//********************************************* */
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {

//         // establece el directorio donde se almacenaran los archivos subidos
//         cb(null, 'public/uploads');
//     },
//     filename: (req, file, cb) => {
//         const filename = file.originalname;

//         // establece el mismo directorio del archivo subido
//         cb(null, filename);
//     }
// });
// ****************************************************************



export default  upload;