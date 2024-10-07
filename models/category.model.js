const connectDatabase = require('../config/database')


const categoryModel = {

    /**
     * Create a category for products.
     * 
     * @param {[name: string, description: string]} values - An array of values to insert.
     * @returns - Query result on index 0.
     */
    createCategory: async (values) => {
        const conn = await connectDatabase()
        const sql = 'insert into category(name, description) values(?, ?)'

        return await conn.query(sql, values)
    },

    /**
     * Add product to a category.
     * 
     * @param {string} productId - Id of product to add.
     * @param {*} categoryId - Id of category where the product will be added.
     * @returns - Query result on index 0.
     */
    addProductToCategory: async (categoryId, productId) => {
        const conn = await connectDatabase()
        const sql = 'insert into category_products(category_id, product_id) values(?, ?)'

        return await conn.query(sql, [categoryId, productId])
    },


    
    /**
     * Get all categories and array of products on each.
     * 
     * @param {number} limit - Limit the categories to be retrieved.
     * @returns {{id: number, name: string, products: {id: number, name: string, images: {imageUrl: string, attribute}[], price: number, description: string}[] }[]} - Query result on index 0.
     */
    readAllCategoriesWithProducts: async (limit = 100) => {
        const conn = await connectDatabase()
        const sql = `SELECT 
            categories.category_id AS id, 
            categories.name,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', products.product_id,
                    'name', products.name,
                    'images', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'url', product_images.url,
                                'attribute', product_images.attribute
                            )
                        ) 
                        FROM product_images
                        WHERE product_images.product_id = products.product_id
                    ),
                    'price', products.price,
                    'description', products.description
                )
            ) AS products
        FROM 
            category_products
        INNER JOIN categories ON categories.category_id = category_products.category_id
        INNER JOIN products ON products.product_id = category_products.product_id
        GROUP BY categories.category_id
        LIMIT ?
        `

        return await conn.query(sql, [limit])
    },



    /**
     * Update category name or description.
     * 
     * @param {string} id 
     * @param {{name: string, description: string}} fields - Fields to update.
     * @returns - Query result on index 0.
     */
    updateCategoryById: async (id, fields) => {
        const conn = await connectDatabase()

        // default to null
        const { name = null, description = null } = fields

        // placeholder for non-null
        const sql = 'update categories set name = coalesce(?, name), description = coalesce(?, description) where category_id = ?'

        // match placeholder
        const values = [name, description, id]

        return await conn.query(sql, values)
    },



    /**
     * Delete the reference tying product to a category.
     * 
     * @param {string} categoryId - Id of category the product will be removed.
     * @param {string} productId - Id of product to be removed from category.
     * @returns - Query result on index 0.
     */
    removeProductFromCategory: async (categoryId, productId) => {
        const conn = await connectDatabase()
        const sql = 'delete from category_products where category_id = ? and product_id = ?'

        return await conn.query(sql, [categoryId, productId])
    },

    /**
     * Delete a category.
     * 
     * @param {string} id - Id of category to be removed.
     * @returns - Query result on index 0.
     */
    deleteCategoryById: async (id) => {
        const conn = await connectDatabase()
        const sql = 'delete from categories where category_id = ?'

        return await conn.query(sql, [id])
    }

}


module.exports = categoryModel