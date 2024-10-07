const mysql2 = require('mysql2/promise')


const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'g_seven_ecommerce'
}

// use only one connection
let connection = null;

/**
 * This function connects to the database and returns the connection.
 * This will only return existing connection if there already is.
 * 
 * @returns Existing database connection.
 */
const connectDatabase = async () => connection ??= await mysql2.createConnection(credentials)


module.exports = connectDatabase