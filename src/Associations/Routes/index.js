import express from 'express';

import { validateAssociation } from '../Middlewares/validations';
import associationController from '../Controllers';

const associationsHandler = express.Router();

associationsHandler.post( '/', validateAssociation, associationController.addNew );

export default associationsHandler;