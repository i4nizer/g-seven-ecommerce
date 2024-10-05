const connection = require('../config/database')


const cartModel = {

    /**
     * Created along with user registration.
     * 
     * @param {string} userId - Id of user the cart will be created for.
     * @returns - Query result on index 0.
     */
    createCart: async (userId) => {
        const conn = await connection
        const sql = 'insert into cart(user_id) values(?)'

        return await conn.query(sql, [userId])
    },

    /**
     * Add product to cart.
     * 
     * @param {string} cartId - Id of the user's cart.
     * @param {string} productId - Id of the product to be added on user's cart.
     * @param {number} quantity - Quantity of products added.
     * @returns - Query result on index 0.
     */
    addProductToCart: async (cartId, productId, quantity) => {
        const conn = await connection
        const sql = 'insert into cart_items(cart_id, product_id, quantity) values(?, ?, ?)'

        return await conn.query(sql, [cartId, productId, quantity])
    },



    /**
     * Get the user's cart products.
     * 
     * @param {string} id - Id of the user to get the cart products.
     * @returns {{name: string, description: string, image_url: string, price: number, quantity: number, created_at: Date, updated_at: Date}} - Array of products in the user's cart.
     */
    getAllCartProductsByUserId: async (id) => {
        const conn = await connection
        const sql = `select products.* from products
                        inner join cart_items on cart_items.product_id = products.product_id
                        inner join cart on cart.cart_id = cart_items.cart_id
                     where cart.user_id = ?`

        return await conn.query(sql, [id])
    },



    /**
     * Update product quantity.
     * 
     * @param {string} cartId - Id of the cart the product is located.
     * @param {string} productId - Id of the product to update.
     * @param {number} quantity - New quantity of the products.
     * @returns - Query result on index 0.
     */
    updateProductQuantity: async (cartId, productId, quantity) => {
        const conn = await connection
        const sql = 'update cart_items set quantity = ? where cart_id = ? and product_id = ?'

        return await conn.query(sql, [quantity, cartId, productId])
    },



    /**
     * Remove product from cart.
     * 
     * @param {string} cartId - Id of the cart the product is located.
     * @param {string} productId - Id of the product to be removed from the cart.
     * @returns - Query result on index 0.
     */
    removeProductFromCart: async (cartId, productId) => {
        const conn = await connection
        const sql = 'delete from cart_items where cartId = ? and product_id = ?'

        return await conn.query(sql, [cartId, productId])
    }
}


module.exports = cartModel