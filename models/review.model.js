const connection = require('../config/database')


const reviewModel = {

    /**
     * Create a review.
     * 
     * @param {string} productId - Id of the product to be reviewed.
     * @param {string} userId - Id of user who reviewed.
     * @param {[rating: number, comment: string]} review - Array of review details.
     * @returns - Query result on index 0.
     */
    createReview: async (productId, userId, review) => {
        const conn = await connection
        const sql = `insert into reviews(product_id, user_id, rating, comment) values(?, ?, ?, ?)`

        return await conn.query(sql, [productId, userId, ...review])
    },



    /**
     * 
     * @param {string} productId - Id of the product to retrieve reviews.
     * @returns {{review_id: number, product_id: number, user_id: number, rating: number, comment: string, created_at: Date }[0][]} - Array of reviews on index 0.
     */
    getProductReviews: async (productId) => {
        const conn = await connection
        const sql = `select reviews.* from reviews
                        inner join products on products.product_id = reviews.product_id
                    where products.product_id = ?`
        
        return await conn.query(sql, [productId])
    },



    /**
     * Update product review.
     * 
     * @param {string} productId - Id of the product the review is updated on.
     * @param {string} reviewId - Id of the review of the product.
     * @param {[rating: number, comment: string]} review - Updated review details.
     * @returns - Query result on index 0.
     */
    updateProductReview: async (productId, reviewId, review) => {
        const conn = await connection
        const sql = `update reviews set rating = coalesce(?, rating), comment = coalesce(?, comment) where product_id = ? and review_id = ?`

        return await conn.query(sql, [...review, productId, reviewId])
    },



    /**
     * Delete unwanted review.
     * 
     * @param {string} id - Id of the review to be removed.
     * @returns - Query result on index 0.
     */
    deleteReviewById: async (id) => {
        const conn = await connection
        const sql = `delete from reviews where review_id = ?`

        return await conn.query(sql, [id])
    },

}


module.exports = reviewModel