const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')


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