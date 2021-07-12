import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import Role from './config/RoleEnum';
import AuthService from './middleware/AuthService';

const routes = Router();
const upload = multer(uploadConfig);



export default routes;