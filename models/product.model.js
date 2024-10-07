const connectDatabase = require('../config/database')


const productModel = {

    /**
     * Insert product details.
     * 
     * @param {[name: string, description: string, imageUrl: string, price: number, quantity: number]} values - An array of product details.
     * @returns - Result of query, access on index 0 to get details.
     */
    insert: async (values) => {
        const conn = await connectDatabase()
        const sql = 'insert into products(name, description, image_url, price, quantity) values(?, ?, ?, ?, ?)'

        return await conn.query(sql, values)
    },



    /**
     * Get product details.
     * 
     * @param {string} id - Id of product to be retrieved.
     * @returns - Product array on index 0.
     */
    readById: async (id) => {
        const conn = await connectDatabase()
        const sql = 'select * from products where id = ?'

        return await conn.query(sql, [id])
    },

    /**
     * Get all products.
     * 
     * @param {number} limit - Limit the number of products retrieved.
     * @returns - Product array on index 0.
     */
    readAll: async (limit = 100) => {
        const conn = await connectDatabase()
        const sql = 'select * from products limit ?'

        return await conn.query(sql, [limit])   
    },

    /**
     * Get details, images, and reviews of the product.
     * 
     * @param {string} id - Id of the product.
     * @returns {{product_id: number, name: string, description: string, price: number, quantity: number, created_at: Date, updated_at: Date, images: {url: string, attribute: string}[], reviews: {userId: number, username: string, rating: number, comment: string}[] }[0][]} - Query result on index 0.
     */
    readDetailsImagesReviewsById: async (id) => {
        const conn = await connectDatabase()
        const sql = `select products.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'url', product_images.url,
                    'attribute', product_images.attribute
                )
            ) as images,
            (select JSON_ARRAYAGG(
                JSON_OBJECT(
                    'userId', users.user_id,
                    'username', users.username,
                    'rating', reviews.rating,
                    'comment', reviews.comment
                )
            ) from reviews 
            inner join users on users.user_id = reviews.user_id
            where reviews.product_id = products.product_id
            ) as reviews
            from products
            left join product_images on product_images.product_id = products.product_id
        where products.product_id = ?
        group by products.product_id;
        `

        return await conn.query(sql, [id])
    },



    /**
     * Update specific product.
     * 
     * @param {string} id - Id of product to update.
     * @param {{name: string, description: string, imageUrl: string, price: number, quantity: number}} fields - Product details to update.
     * @returns - Query result on index 0.
     */
    updateById: async (id, fields) => {
        const conn = await connectDatabase()

        // default to null
        const { name = null, description = null, imageUrl = null, price = null, quantity = null } = fields

        // set default for nulls
        const sql = 'update products set name = coalesce(?, name), description = coalesce(?, description), image_url = coalesce(?, image_url), price = coalesce(?, price), quantity = coalesce(?, quantity) where product_id = ?'

        // match placeholder
        const values = [name, description, imageUrl, price, quantity, id]

        return await conn.query(sql, values)
    },



    /**
     * Delete specific product.
     * 
     * @param {string} id - Id of product to delete.
     * @returns - Query result on index 0.
     */
    deleteById: async (id) => {
        const conn = await connectDatabase()
        const sql = 'delete from products where product_id = ?'

        return await conn.query(sql, [id])
    },


}


module.exports = productModel