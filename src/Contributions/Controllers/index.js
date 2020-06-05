import dbClient from '../../db/knex';
import { driversTable, contributionsTable } from '../../db/tables';

/**
 * utility class for keeping contributions controllers.
 */
class Controllers {

    /**
     * @description a method to add a contribution
     * @param {object} req request body 
     * @param {object} res  response body
     */
    static async addContribution (req, res) {
            let { type, amount } = req.body;
            let { id } = req.user;
            amount = parseInt(amount);
            console.log('>>>>>From Contributions Controller', 'req.user object', req.user)
            console.log('>>>>>From Contributions Controller', 'DestructuredId', id)
            console.log('>>>>>From Contributions Controller', 'req.user.id', id)
        try {
            let opening_balance;
            let closing_balance;
            type = type.trim();
            let contributions = await dbClient(contributionsTable).select('*').where('driver_id', id);
            if (contributions.length === 0) {
                opening_balance = 0;
                closing_balance = amount;
            } else {
                opening_balance = contributions[contributions.length -1].closing_balance;
                closing_balance = opening_balance + amount;
            }
            await dbClient(contributionsTable)
            .insert({ type, amount, driver_id: id, opening_balance, closing_balance });
            return res.status(201).json({ msg: 'contribution recorded'})
        } catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while adding contribution',
                errName: err.name,
                errMessage: err.message
                })
        }
    }

    static async fetchContributions (req, res) {
        let driverId = req.user.id;
        try {
        const contributions = await dbClient(contributionsTable)
        .select('*').where('driver_id', driverId);
        if(contributions.length === 0) return res.status(404)
        .json({msg: 'You have no contibutions yet', contributions})
        return res.status(200)
        .json({ msg: 'all contributions', contributions});
        } catch(err) {
            return res.status(500)
            .json({
                msg: 'internal server error occured while fetching contributions',
                errMessage: err.message
            })
        }
        
    }
}



export default Controllers;