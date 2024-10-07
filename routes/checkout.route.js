const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');
const userMiddleware = require('../middlewares/user.middleware')


// POST route to submit payment address
router.get('/', checkoutController.getCheckoutPage)
router.post('/submit_payment_address', checkoutController.submitPaymentAddress);


module.exports = router;