// clase error de middleware
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err); // por error mostramos error
    const statusCode = err.statusCode || StatusCodes.NOT_FOUND   // * nos saldra NO_FOUND en todos los errores por esta predeterminacion ***
    const msg = err.message || 'something went wrong, try again later'
    res.status(statusCode).json({msg});
};


//  exportamos el error
export default errorHandlerMiddleware;