    import    mongoose        from "mongoose";
    import   { JOB_STATUS, JOB_TYPE }   from "../utils/constants.js";

//  ***** MODELADO DE LLENADO DE TRABAJO  *********
const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    jobStatus: {             // celda # 1, celda con tres opciones de string
        type: String,        // tipo de dato 
        enum: Object.values(JOB_STATUS),  // strings de la celda
        default: JOB_STATUS.PENDING,                       // por defecto

    },
    jobType: {             // celda # 2, celda con tres opciones de string
        type: String,        // tipo de dato 
        enum: Object.values(JOB_TYPE),  // strings de la celda
        default: JOB_TYPE.FULL_TIME,                       // por defecto

    }, 
    jobLocation:{         // celda 3
        type: String,      // tipo dato
        default: 'my city',  // por defecto
    },
    
    createdBy: {         // conect User and Job
            type: mongoose.Types.ObjectId,
            ref: 'User',
    },
 },
          
{ timestamps: true} // establece la creacion y actualizacion del documento
);


// exportamos por defecto el modelado
export default mongoose.model('Job',JobSchema); // le damos un nombre y exportamos la constante creada