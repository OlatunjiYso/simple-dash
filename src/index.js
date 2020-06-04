import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


console.log(process.env.NODE_ENV)

app.listen(process.env.PORT, () => {
    if(process.env.NODE_ENV === 'development') {
        console.log(`server running on localhost: ${process.env.PORT}`);
    }
});