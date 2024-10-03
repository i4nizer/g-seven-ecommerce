const connection = require('../config/database')


const userModel = {

    /**
     * Insert user credentials to database upon sign up.
     * 
     * @param {[username: string, email: string, password: string, firstname: string, lastname: string, phone: string, role?: string ]} values - Values to insert into the database.
     * @returns - Result of query on index 0.
     */
    insert: async (values) => {
        const conn = await connection
        const sql = 'insert into users(username, email, password, firstname, lastname, phone, role) values(?, ?, ?, ?, ?, ?, ?)'

        return await conn.query(sql, values)
    },



    /**
     * Get user credentials.
     * 
     * @param {string} id - Id of user to be retrieved.
     * @returns - User array on index 0.
     */
    readById: async (id) => {
        const conn = await connection
        const sql = 'select * from users where user_id = ?'        
        
        return await conn.query(sql, [id])
    },

    /**
     * Get username with such username and password.
     * 
     * @param {string} username - Username used by the user.
     * @param {string} password - Password of the user.
     * @returns {{ user_id: number, username: string, email: string, password: string, firstname: string, lastname: string, phone: string, role: string, created_at: Date, updated_at: Date  }[]} - An array of user objects length 1.
     */
    readByUsernamePassword: async (username, password) => {
        const conn = await connection
        const sql = `select * from users where username = ? and password = ?`

        return await conn.query(sql, [username, password])
    },

    /**
     * Get all users with their credentials.
     * 
     * @param {number} limit - Limit the number of users retrieved.
     * @returns {{ user_id: number, username: string, email: string, password: string, firstname: string, lastname: string, phone: string, role: string, created_at: Date, updated_at: Date  }[]} - An array of user objects.
     */
    readAll: async (limit = 100) => {
        const conn = await connection
        const sql = 'select * from users limit = ?'
      
        return await conn.query(sql, [limit])
    },



    /**
     * Update one user credentials.
     * 
     * @param {{username?: string, email?: string, password?: string, firstname?: string, lastname?: string, phone?: string, role?: string }} fields - An object that contains fields to update.
     * @param {string} id - Id of user to update.
     * @returns - Result of query.
     */
    updateById: async (id, fields) => {
        const conn = await connection
        
        // default unupdated values to null
        const { username = null, email = null, password = null, firstname = null, lastname = null, phone = null, role = null } = fields
        
        // if value is null set default
        let sql = `update users set username = coalesce(?, username), email = coalesce(?, email), password = coalesce(?, password), firstname = coalesce(?, firstname), lastname = coalesce(?, lastname), phone = coalesce(?, phone), role = coalesce(?, role) where user_id = ?`;
        
        // match placeholder
        const values = [username, email, password, firstname, lastname, phone, role, id]

        return await conn.query(sql, [values])
    },



    /**
     * Delete user by id.
     * 
     * @param {string} id - Id of user to be deleted.
     * @returns - Result of delete query.
     */
    deleteById: async (id) => {
        const conn = await connection
        const sql = 'delete from users where user_id = ?'
      
        return await conn.query(sql, [id])
    }

}


module.exports = userModel