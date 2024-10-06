const cartModel = require('../models/cart.model')


const cartController = {

    // page for user's cart
    getCartPage: async (req, res) => {
        
        // use userId from req as verified by jwt
        // and send page with result
        await cartModel.readAllCartItemsByUserId(req.userId)
            .then(result => res.render('cart', { cartItems: result[0] }))
            .catch(err => res.status(500).send(err))
    },

    // api for adding product to cart
    postAddProductToCart: async (req, res) => {

        // get cardId using userId
        let cartId = ''
        let error = false
        await cartModel.readCartIdByUserId(req.userId)
            .then(result => cartId = result[0][0].cartId)
            .catch(err => error = err)
        
        // check for error
        if(error) return res.status(500).send(error)

        // send result
        await cartModel.addProductToCart(cartId, req.body.productId, req.body.quantity)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err))
    }

}


module.exports = cartController