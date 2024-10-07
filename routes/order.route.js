const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const userMiddleware = require('../middlewares/user.middleware');


// Protect the route with middleware
router.get('/history/all-order', userMiddleware.validateLoginToken, orderController.getOrderHistoryPage);


module.exports = router;