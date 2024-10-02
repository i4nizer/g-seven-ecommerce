const connectDatabase = require('../config/database')


const userModel = {

    /**
     * Insert user credentials to database upon sign up.
     * 
     * @param {[username: string, email: string, password: string, firstname: string, lastname: string, phone: string, role?: string ]} values - Values to insert into the database.
     * @returns - Result of the query.
     */
    insert: async (values) => {
        const conn = await connectDatabase()
        const sql = 'insert into users(username, email, password, first_name, last_name, phone_number, role) values(?, ?, ?, ?, ?, ?, ?)'
        const result = await conn.query(sql, values)
        
        return result
    }

}


module.exports = userModel