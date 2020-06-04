import dbClient from '../../db/knex';
import { driversTable, contributionsTable } from '../../db/tables';

// Get all driverId(s)
// For each driverId, find their closingBalance,
      // create a variable to hold weeklyInterest 15% of closingBalance
      //  make a contribution that adds that weekly interst.

      const weeklyInterestJob = async() => {
          
        try {
            let driverIds = await dbClient(driversTable).select('driver_id');
            driverIds.map(async(id)=> {
                const contributions = await dbClient(contributionsTable).select('closing_balance').where('driver_id', id.driver_id);
                
                if (contributions.length !== 0) {
                    const balance = contributions[contributions.length - 1].closing_balance;
                    const interest =  balance * 0.15;
                    const newBalance = balance + interest;
                   await dbClient(contributionsTable)
                   .insert({amount: interest, driver_id: id.driver_id, type: 'interest', opening_balance: balance, closing_balance: newBalance})
                }
            })
        } catch(err) {
            console.log('error during weekly cron', err.message)
        }
      }

      export default weeklyInterestJob