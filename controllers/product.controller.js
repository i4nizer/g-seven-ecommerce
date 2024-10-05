const categoryModel = require('../models/category.model')


const productController = {

    // page for products
    getProductsPage: async (req, res) => {
        
        // render page based on categories and its products
        await categoryModel.readAllCategoriesWithProducts()
            .then(result => res.render('products', { categories: result[0] }))
            .catch(err => res.status(500).send(err))
    }

}


module.exports = productController