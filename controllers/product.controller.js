const categoryModel = require('../models/category.model')
const productModel = require('../models/product.model')
const reviewModel = require('../models/review.model')


const productController = {

    // page for products
    getProductsPage: async (req, res) => {
        
        // render page based on categories and its products
        await categoryModel.readAllCategoriesWithProducts()
            .then(result => res.render('products', { categories: result[0] }))
            .catch(err => res.render('errors/error', { error: err }))
    },

    // page for product details
    getProductDetailsPage: async (req, res) => {

        // render product details
        await productModel.readDetailsImagesReviewsById(req.params.productId)
            .then(result => res.render('product-details', { product: result[0][0] }))   // assume there will always be a product
            .catch(err => res.render('errors/error', { error: err }))
    },

    // api to create a review
    postProductReview: async (req, res) => {
        const productId = req.body.productId
        const userId = req.userId
        const review = [req.body.rating, req.body.body]

        // send result
        await reviewModel.createReview(productId, userId, review)
            .then(result => res.send(result[0]))
            .catch(err => res.render('errors/error', { error: err }))
    }

}


module.exports = productController