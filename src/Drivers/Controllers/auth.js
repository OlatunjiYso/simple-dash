import dbClient from '../../db/knex';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import { driversTable } from '../../db/tables';
const jwtKey = process.env.JWT_SECRET_KEY;

/**
 * utility class for keeping drivers related controllers.
 */
class Authentication {

    /**
     * @description a method to add a new driver
     * @param {object} req request body 
     * @param {object} res  response body
     */
    static async signup (req, res) {
        const { name, email, password, associationId } = req.body;
        try {
            let driverRecord = await dbClient
            .select('*')
            .from(driversTable)
            .where('email', email);

            if(driverRecord.length > 0) return res.status(403).json({msg: 'email is taken'});
            let salt = bcrypt.genSaltSync(10);
            let hashedPassword = bcrypt.hashSync(password, salt);
            await dbClient(driversTable)
            .insert({ name, email, password: hashedPassword, association_id: associationId });
            return res.status(201).json({ msg: 'driver created'})

        } catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while adding driver',
                errName: err.name,
                errMessage: err.message
                })
        }
    }


    /**
     * @description a method to login a driver
     * @param {object} req request body 
     * @param {object} res  response body
     */
    static async login(req, res) {
        const { email, password } = req.body;
       try {
            const driverRecord = await dbClient.select('*').from(driversTable).where('email', email);
            if (driverRecord.length === 0) return res.status(404).json({msg: 'incorrect username or password'});
            const driverPassword = driverRecord[0].password;
            let passwordIsValid = bcrypt.compareSync(password, driverPassword);
            if(!passwordIsValid) return res.status(404).json({msg: 'incorrect username or password'});
            const token = jwt.sign({id: driverRecord[0].driver_id}, jwtKey);
            return res.status(200).json({msg: 'logged in', token})
        } 
        catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while logging in',
                errName: err.name,
                errMessage: err.message
            })
        }
    }
}



export default Authentication;