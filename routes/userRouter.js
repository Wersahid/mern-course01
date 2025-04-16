// AUTHENTICATION ROUTER
import          { Router }             from  'express';
import   {getCurrentUser, getApplicationStats, updateUser}  from  '../controllers/userController.js'; // importamos los controllers de user
import              { validateUpdateUserInput }             from '../middleware/validationMiddleware.js'; // para poder validar el update user
import              {authorizePermissions, checkForTestUser}  from '../middleware/authMiddleware.js'  // #### implementamos checkForTestUser para validar el demo user #######
import                 upload                               from  '../middleware/multerMiddleware.js' // importamos multer para la importacion de archivos

const router = Router();

router.get('/current-user', getCurrentUser);    // current user

router.get('/admin/app-stats', [         // solo el admin podra ejecutar la function getApplicationStats
    authorizePermissions('admin'),
    getApplicationStats
]); 

// ######## implementamos checkForTestUser para validar el demo user  #########
router.patch('/update-user', checkForTestUser, upload.single('avatar'), validateUpdateUserInput, updateUser);                 // update user

export default router;
