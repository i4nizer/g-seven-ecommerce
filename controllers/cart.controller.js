const cartModel = require('../models/cart.model')


const cartController = {

    // page for user's cart
    getCartPage: async (req, res) => {
        
        // use userId from req as verified by jwt
        // and send page with result
        await cartModel.getAllCartItemsByUserId(req.userId)
            .then(result => res.render('cart', { cartItems: result[0] }))
            .catch(err => res.status(500).send(err))
    }

}


module.exports = cartController