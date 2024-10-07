const orderHistoryModel = require('../models/order-history.model');

const orderHistoryController = {

    getOrderHistoryPage: async (req, res) => {
        try {
            const userId = req.userId; // Get the user ID from the request
            const orders = await orderHistoryModel.getAllOrdersByUserId(userId);
            
            // Pass 'orders' and a 'message' variable to the view
            const message = orders.length === 0 ? 'No orders found.' : null;

            res.render('order-history', { orders, message });
        } catch (error) {
            console.error('Error fetching order history:', error);
            res.status(500).send('Error fetching order history');
        }
    },
};

module.exports = orderHistoryController;
