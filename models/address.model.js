const connectDatabase = require('../config/database')


const addressModel = {

    /**
     * Insert an address of a user.
     * 
     * @param {[userId: string, address: string, city: string, state: string, postalCode: string, country: string]} values - An array of address details.
     * @returns - Result of query, access on index 0 to get details.
     */
    insert: async (values) => {
        const conn = await connectDatabase()
        const sql = 'insert into addresses(user_id, address, city, state, postal_code, country) values(?, ?, ?, ?, ?, ?)'

        return await conn.query(sql, values)
    },



    /**
     * Select addresses of a specific user.
     * 
     * @param {string} id - Id of the user whose address to be retrieved.
     * @returns - Address array on index 0.
     */
    readAllByUserId: async (id) => {
        const conn = await connectDatabase()
        const sql = 'select * from addresses where user_id = ?'

        return await conn.query(sql, [id])
    },



    /**
     * Update address details.
     * 
     * @param {string} id - Id of the address to update.
     * @param {{userId: string, address: string, city: string, state: string, postalCode: string, country: string}} fields - An array of fields to update.
     * @returns - Query result on index 0.
     */
    updateById: async (id, fields) => {
        const conn = await connectDatabase()

        // default to null
        const { address = null, city = null, state = null, postalCode = null, country = null } = fields

        // placeholder for non-null
        const sql = 'update addresses set address = coalesce(?, address), city = coalesce(?, city), state = coalesce(?, state), postal_code = coalesce(?, postal_code), country = coalesce(?, country) where address_id = ?'

        // match placeholder
        const values = [address, city, state, postalCode, country, id]

        return await conn.query(sql, values)
    },



    /**
     * Delete an address of a user.
     * 
     * @param {string} id - Id of address to delete.
     * @returns - Query result on index 0.
     */
    deleteById: async (id) => {
        const conn = await connectDatabase()
        const sql = 'delete from addresses where address_id = ?'

        return await conn.query(sql, [id])
    }

}


module.exports = addressModel