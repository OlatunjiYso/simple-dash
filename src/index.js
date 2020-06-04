import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';

import driversHandler from './Drivers/Routes'
import associationsHandler from './Associations/Routes';

dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/apis/v1/drivers', driversHandler);
app.use('/apis/v1/associations', associationsHandler);
app.use('*', (req,res)=> res.status(404).json({msg: 'route not defined'}));


app.listen(process.env.PORT, () => {
    if(process.env.NODE_ENV === 'development') {
        console.log(`server running on localhost: ${process.env.PORT}`);
    }
});

