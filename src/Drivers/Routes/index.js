import express from 'express';

import { validateLogin, validateSignup } from '../Middlewares/validation';
import authController from '../Controllers/auth';

const driversHandler = express.Router();

driversHandler.post( '/login', validateLogin, authController.login );
driversHandler.post('/signup', validateSignup, authController.signup );

export default driversHandler;