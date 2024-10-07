const cartModel = require('../models/cart.model')


const cartController = {

    // page for user's cart
    getCartPage: async (req, res) => {
        
        // use userId from req as verified by jwt
        // and send page with result
        await cartModel.readAllCartItemsByUserId(req.userId)
            .then(result => res.render('cart', { cartItems: result[0] }))
            .catch(err => res.render('errors/error', { error: err }))
    },



    // api for adding product to cart
    postAddProductToCart: async (req, res) => {
        try {
            // get cartId using userId
            const result = await cartModel.readCartIdByUserId(req.userId);
            
            // gather params
            const cartId = result[0][0]?.cartId
            const productId = req.body.productId
            const quantity = req.body.quantity

            // add product to cart
            const addResult = await cartModel.addProductToCart(cartId, productId, quantity)
            res.send(addResult)

        } catch (err) { res.render('errors/error', { error: err }) }
    },



    // update product quantity on cart
    patchProductQuantityOnCart: async (req, res) => {
        try {
            // gather params
            const cartItemId = req.body.cartItemId
            const quantity = req.body.quantity

            // update product quantity to cart
            const updateResult = await cartModel.updateCartItemQuantity(cartItemId, quantity)
            res.send(updateResult)

        } catch (err) { res.render('errors/error', { error: err }) }
    },



    // remove product from cart
    deleteCartItemFromCart: async (req, res) => {
        try {
            // gather params
            const cartItemId = req.body.cartItemId

            // add product to cart
            const deleteResult = await cartModel.deleteCartItemById(cartItemId)
            res.send(deleteResult)

        } catch (err) { res.render('errors/error', { error: err }) }
    },

}


module.exports = cartController