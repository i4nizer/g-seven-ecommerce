const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller')
const userMiddleware = require('../middlewares/user.middleware')


router.route('/')
    .get(userMiddleware.validateLoginToken, cartController.getCartPage)
    .post(userMiddleware.validateLoginToken, cartController.postAddProductToCart)
    .patch(userMiddleware.validateLoginToken, cartController.patchProductQuantityOnCart)
    .delete(userMiddleware.validateLoginToken, cartController.deleteCartItemFromCart)


module.exports = router