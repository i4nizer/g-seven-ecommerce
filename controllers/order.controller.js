const orderModel = require('../models/order.model');


const orderController = {

    // page for order history
    getOrderHistoryPage: async (req, res) => {
        try {
            const userId = req.userId; // Get the user ID from the request
            const orders = await orderModel.getAllOrdersByUserId(userId);
            
            // Pass 'orders' and a 'message' variable to the view
            const message = orders.length === 0 ? 'No orders found.' : null;

            res.render('order-history', { orders: orders, message: message });

        } catch (err) { res.render('errors/error', { error: err }); }
    },
};


module.exports = orderController;