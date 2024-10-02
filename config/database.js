const mysql2 = require('mysql2/promise')


const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'g_seven_ecommerce'
}

const connectDatabase = async () => await mysql2.createConnection(credentials)


module.exports = connectDatabase