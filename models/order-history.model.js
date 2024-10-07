const connectDatabase = require('../config/database');

const orderHistoryModel = {
    
    /**
     * Get all orders by user ID.
     * 
     * @param {string} userId - ID of the user to get their order history.
     * @returns {Promise<Array>} - List of orders.
     */
    getAllOrdersByUserId: async (userId) => {
        const conn = await connectDatabase(); // Ensure this returns a valid database connection
        const sql = `
            SELECT orders.*, order_items.*, products.*
            FROM orders
            INNER JOIN order_items ON orders.order_id = order_items.order_id
            INNER JOIN products ON order_items.product_id = products.product_id
            WHERE orders.user_id = ?
            ORDER BY orders.created_at DESC
        `;

        const [rows] = await conn.query(sql, [userId]);
        return rows; // Return the rows (list of orders)
    },
};

module.exports = orderHistoryModel;
