// AUTHENTICATION ROUTER
import          { Router }             from  "express";
import        {register, login,logout}        from  '../controllers/authController.js'; // importamos los controllers que utilizaremos (register,login)
import       {validateRegisterInput, validateLoginInput}   from  '../middleware/validationMiddleware.js'// importamos la validation  de register

const router = Router();

router.post('/register',validateRegisterInput, register);
router.post('/login',validateLoginInput, login);  // implementamos el login validate
router.get('/logout',logout)                  // implementamos el logout para cerrar sesion

export default router;