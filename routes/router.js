const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')

const authenticationRoutes = require('./authentication.route')
const productRoutes = require('./product.route')
const checkoutRoutes = require('./checkout.route')
const cartRoutes = require('./cart.route')
const orderRoutes = require('./order.route')


// needed parsers
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(cookieParser())

// specific routes
router.use('/authentication', authenticationRoutes)
router.use('/products', productRoutes)
router.use('/checkout', checkoutRoutes)
router.use('/cart', cartRoutes)
router.use('/order', orderRoutes)

// home route
router.get('/', async (req, res) => {
    
    // render page based on categories and its products
    await require('../models/category.model').readAllCategoriesWithProducts()
        .then(result => res.render('index', { categories: result[0] }))
        .catch(err => res.render('errors/error', { error: err }))
})

// 404 Handler
router.use((req, res) => res.render('errors/404'))





module.exports = router