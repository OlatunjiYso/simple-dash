import dbClient from '../../db/knex';
import { associationsTable } from '../../db/tables';

/**
 * utility class for keeping association controllers.
 */
class Controllers {

    /**
     * @description a method to add a association
     * @param {object} req request body 
     * @param {object} res  response body
     */
    static async addNew (req, res) {
            let { associationName } = req.body;
       
        try {
            associationName = associationName.trim();
            let associationRecord = await dbClient
            .select('*')
            .from(associationsTable)
            .where('association_name', associationName);
            let foundName = (associationRecord[0]) ? associationRecord[0].association_name : null;
            
            if( foundName && (foundName.toLowerCase() === associationName.toLowerCase()) ) {
                return res.status(403).json({msg: 'association name is taken'});
            }
            
            await dbClient(associationsTable)
            .insert({ association_name: associationName });
            return res.status(201).json({ msg: 'association created'})

        } catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while adding asssociation',
                errName: err.name,
                errMessage: err.message
                })
        }
    }
}



export default Controllers;