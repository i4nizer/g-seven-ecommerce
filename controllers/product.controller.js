const productModel = require('../models/product.model')


const productController = {

    // api to get products
    getProducts: async (req, res) => {
        
        // send result
        await productModel.readAll()
            .then(products => res.send(products[0]))
            .catch(err => res.status(500).send(err))
    }

}


module.exports = productController