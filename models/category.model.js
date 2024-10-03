const connection = require('../config/database')


const categoryModel = {

    /**
     * Create a category for products.
     * 
     * @param {[name: string, description: string]} values - An array of values to insert.
     * @returns - Query result on index 0.
     */
    createCategory: async (values) => {
        const conn = await connection
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
        const conn = await connection
        const sql = 'insert into category_products(category_id, product_id) values(?, ?)'

        return await conn.query(sql, [categoryId, productId])
    },



    /**
     * Update category name or description.
     * 
     * @param {string} id 
     * @param {{name: string, description: string}} fields - Fields to update.
     * @returns - Query result on index 0.
     */
    updateCategoryById: async (id, fields) => {
        const conn = await connection

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
        const conn = await connection
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
        const conn = await connection
        const sql = 'delete from categories where category_id = ?'

        return await conn.query(sql, [id])
    }

}


module.exports = categoryModel