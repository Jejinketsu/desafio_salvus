import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import Role from './config/RoleEnum';
import AuthService from './middleware/AuthService';
import UserController from '../src/controllers/UserController';
import ProfessionalController from './controllers/ProfessionalController';

const routes = Router();
const upload = multer(uploadConfig);

// User
routes.post('/signup', UserController.create);
routes.get('/login', UserController.login);
routes.get('/get_users', AuthService.authorize, AuthService.authRole([Role.Super, Role.Admin]),
    UserController.getUser);
routes.patch('/update_user', AuthService.authorize, UserController.update);
routes.delete('/delete_user', AuthService.authorize, UserController.delete);

// Professional
routes.post('/signup_pro', ProfessionalController.create);
routes.get('/get_pro', AuthService.authorize, AuthService.authRole([Role.Super, Role.Admin]),
    ProfessionalController.getProfessional);
routes.patch('/update_pro', AuthService.authorize, ProfessionalController.update);
routes.delete('/delete_pro', AuthService.authorize, ProfessionalController.delete);

export default routes;