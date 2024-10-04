const productModel = require('../models/product.model')


const pageController = {

    getHomePage: async (req, res) => {

        // send home page with products
        await productModel.readAll()
            .then(products => res.render('index', { products: products[0] }))
            .catch(err => res.status(500).send(err))

    }

}


module.exports = pageController