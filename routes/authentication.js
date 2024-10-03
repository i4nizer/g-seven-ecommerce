const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')


router.get('/sign-up', userController.getSignUpPage)
router.post('/sign-up', userMiddleware.validateSignUp, userController.postSignUp)


module.exports = router