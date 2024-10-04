const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const authenticationRoutes = require('./authentication.route')
const productRoutes = require('./product.route')
const userMiddleware = require('../middlewares/user.middleware')
const pageController = require('../controllers/page.controller')


router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(cookieParser())

router.get('/', userMiddleware.validateLoginToken, pageController.getHomePage)
router.use('/authentication', authenticationRoutes)
router.use('/products', productRoutes)





module.exports = router