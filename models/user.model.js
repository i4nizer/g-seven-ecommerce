const connection = require('../config/database')


const userModel = {

    /**
     * Insert user credentials to database upon sign up.
     * 
     * @param {[username: string, email: string, password: string, firstname: string, lastname: string, phone: string, role?: string ]} values - Values to insert into the database.
     * @returns - Result of the query.
     */
    insert: async (values) => {
        const sql = 'insert into users(username, email, password, first_name, last_name, phone_number, role) values(?, ?, ?, ?, ?, ?, ?)'
        return await connection.query(sql, values)
    },



    /**
     * Get user credentials.
     * 
     * @param {string} id - Id of user to be retrieved.
     * @returns {{ user_id: number, username: string, email: string, password: string, first_name: string, last_name: string, phone_number: string, role: string, created_at: Date, updated_at: Date  }[]} - An array of user objects length 1.
     */
    readById: async (id) => {
        const sql = 'select * from users where user_id = ?'        
        return await connection.query(sql, [id])
    },

    /**
     * Get all users with their credentials.
     * 
     * @returns {{ user_id: number, username: string, email: string, password: string, first_name: string, last_name: string, phone_number: string, role: string, created_at: Date, updated_at: Date  }[]} - An array of user objects.
     */
    readAll: async () => {
        const sql = 'select * from users'
        return (await connection).query
    },



    /**
     * Update user credentials.
     * 
     * @param {{ name: string, value: * }[]} fields - An array of fields to update.
     */
    updateById: async (fields) => {
        const sql = 'update users set '
    }


}


module.exports = userModel