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
     * 
     * @param {string} id - UserId to be used to get cartId.
     * @returns {{cartId: number}[0][]} - Query result on index 0.
     */
    readCartIdByUserId: async (id) => {
        const conn = await connection
        const sql = 'select cart.cart_id as cartId from cart where cart.user_id = ?'

        return await conn.query(sql, [id])
    },

    /**
     * Get the user's cart cart items.
     * 
     * @param {string} id - Id of the user to get the cart products.
     * @returns {{id: number, quantity: number, product: {id: number, name: string, price: number, stock: number, image: {id: number, url: string, attribute: string}}}[]} - Array of products in the user's cart.
     */
    readAllCartItemsByUserId: async (id) => {
        const conn = await connection
        const sql = `
            SELECT cart_items.cart_item_id AS id,
            cart_items.quantity,
            JSON_OBJECT(
                'id', products.product_id,
                'name', products.name,
                'price', products.price,
                'stock', products.quantity,
                'image', (
                    SELECT JSON_OBJECT(
                        'id', product_images.product_image_id,
                        'url', product_images.url,
                        'attribute', product_images.attribute
                    ) AS image
                    FROM product_images
                    WHERE product_images.product_id = products.product_id
                    LIMIT 1
                ) -- image object end
            ) AS product
            FROM cart_items
            INNER JOIN products ON products.product_id = cart_items.product_id
            INNER JOIN cart ON cart.cart_id = cart_items.cart_id
            WHERE cart.user_id = ?
        `

        return await conn.query(sql, [id])
    },



    /**
     * Update product quantity on cart.
     * 
     * @param {string} cartId - Id of the cart the product is located.
     * @param {string} productId - Id of the product to update.
     * @param {number} quantity - New quantity of the products.
     * @returns - Query result on index 0.
     */
    updateCartItemQuantity: async (cartItemId, quantity) => {
        const conn = await connection
        const sql = 'update cart_items set quantity = ? where cart_item_id = ?'

        return await conn.query(sql, [quantity, cartItemId])
    },



    /**
     * Remove product from cart.
     * 
     * @param {string} cartId - Id of the cart the product is located.
     * @param {string} productId - Id of the product to be removed from the cart.
     * @returns - Query result on index 0.
     */
    deleteCartItemById: async (cartItemId) => {
        const conn = await connection
        const sql = 'delete from cart_items where cart_item_id = ?'

        return await conn.query(sql, [cartItemId])
    }
}


module.exports = cartModel