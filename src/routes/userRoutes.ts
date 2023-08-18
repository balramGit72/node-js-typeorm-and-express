import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyAuthToken , generateAuthToken } from '../middleware/authMiddleware';
import { createUserValidationRules, validate } from '../middleware/validation';
console.log('generateAuthToken: ', generateAuthToken(1));

const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);
router.post('/users',(req :any, res:any, next : any) => {
    console.log(req.body); // Add this line to check the request body
    next();
  }, createUserValidationRules, validate, verifyAuthToken,  userController.createUser);

// Public route (no authentication required)
router.post('/login', userController.login);

router.get('/profile', verifyAuthToken, userController.getProfile);

export default router;
