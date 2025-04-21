// AUTHENTICATION ROUTER
import          { Router }                    from  "express";
import        {register, login,logout}        from  '../controllers/authController.js'; // importamos los controllers que utilizaremos (register,login)
import       {validateRegisterInput, validateLoginInput}   from  '../middleware/validationMiddleware.js'// importamos la validation  de register
import              rateLimiter               from  'express-rate-limit';

// cantidad de clicks limite por error de login y tiempo de baneo   
const apiLimiter = rateLimiter({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message:{msg: 'IP rate limit exceeded, retry in 2 minutes'}
});


const router = Router();

router.post('/register',apiLimiter, validateRegisterInput, register);
router.post('/login',apiLimiter, validateLoginInput, login);  // implementamos el login validate
router.get('/logout',logout)                  // implementamos el logout para cerrar sesion

export default router;
