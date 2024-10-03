const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')


// use to parse form body (req.body) else undefined
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(cookieParser())

router.route('/users')
    .patch(userMiddleware.validatePatch, userController.patchUser)
    .delete(userController.deleteUser)

router.route('/users/sign-up')
    .get(userController.getSignUpPage)
    .post(userMiddleware.validateSignUp, userController.postSignUp)

router.route('/users/sign-in')
    .get(userController.getSignInPage)
    .post(userMiddleware.validateSignIn, userController.postSignIn)


module.exports = router