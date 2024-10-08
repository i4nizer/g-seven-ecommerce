const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');
const userMiddleware = require('../middlewares/user.middleware')


router.route('/')
    .get(checkoutController.getCheckoutPage)
    .post(checkoutController.submitPaymentAddress);


module.exports = router;