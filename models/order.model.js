const connectDatabase = require('../config/database')


const orderModel = {

    /**
     * Create an order for a user
     * 
     * @param {[userId: string, totalPrice: number, status: string]} values - Order details to insert.
     * @returns - Query result on index 0.
     */
    createOrder: async (values) => {
        const conn = await connectDatabase()
        const sql = 'insert into orders(user_id, total_price, status) values(?, ?, ?)'

        return await conn.query(sql, values)
    },

    /**
     * Add product to an order.
     * 
     * @param {string} orderId - Id of order the product will be added to.
     * @param {[productId: string, quantity: number, price: number]} product - An array of product details.
     * @returns - Query result on index 0.
     */
    addProductsToOrder: async (orderId, product) => {
        const conn = await connectDatabase()
        const sql = 'insert into order_items(order_id, product_id, quantity, price) values(?, ?, ?, ?)'

        return await conn.query(sql, [orderId, ...product])
    },



    /**
     * Get all products within an order.
     * 
     * @param {string} orderId - Id of order the products are in.
     * @returns {{product_id: number, name: string, description: string, image_url: string, price: number, quantity: number, created_at: Date, updated_at: Date}[][]} - Array of products on index 0.
     */
    getOrderProducts: async (orderId) => {
        const conn = await connectDatabase()
        const sql = `select products.* from products
                        inner join order_items on order_items.product_id = products.product_id
                        inner join orders on orders.order_id = order_items.order_id
                    where orders.order_id = ?`
        
        return await conn.query(sql, [orderId])
    },

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



    /**
     * Update quantity of product in order.
     * 
     * @param {string} orderId - Id of order the product is into.
     * @param {string} productId - Id of product the quantity is to be updated.
     * @param {number} quantity - Quantity of such product to order.
     * @returns - Query result on index 0.
     */
    updateProductQuantity: async (orderId, productId, quantity) => {
        const conn = await connectDatabase()
        const sql = `update order_items set quantity = ? where order_id = ? and product_id = ?`

        return await conn.query(sql, [quantity, orderId, productId])
    },



    /**
     * Remove product from an order.
     * 
     * @param {string} orderId - Id of order the product will be removed.
     * @param {string} productId - Id of the product to be removed.
     * @returns - Query result on index 0.
     */
    removeProductFromOrder: async (orderId, productId) => {
        const conn = await connectDatabase()
        const sql = `delete from order_items where order_id = ? and product_id = ?`

        return await conn.query(sql, [orderId, productId])
    },

}


module.exports = orderModel