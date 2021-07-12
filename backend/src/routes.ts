import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import Role from './config/RoleEnum';
import AuthService from './middleware/AuthService';
import UserController from '../src/controllers/UserController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/signup', UserController.create);

export default routes;