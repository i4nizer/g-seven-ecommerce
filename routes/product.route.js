const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const userMiddleware = require('../middlewares/user.middleware')


router.route('/')
    .get(productController.getProductsPage)

router.route('/review')
    .post(userMiddleware.validateLoginToken, productController.postProductReview)

router.get('/:productId', productController.getProductDetailsPage)


module.exports = router