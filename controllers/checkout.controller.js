// const checkoutModel = require('../models/checkout.model');

const paymentAddressController = {
    
    getCheckoutPage: (req, res) => {
        res.render('checkout')
    },

    submitPaymentAddress: (req, res) => {
        try {
            const { address, city, state, postal_code, country, payment_method, payment_date } = req.body;

            // Here, you would typically include validation, for now, we assume valid input
            const newPaymentAddress = PaymentAddressModel.create({
                address,
                city,
                state,
                postal_code,
                country,
                payment_method,
                payment_date,
            });

            // Redirect or respond after saving the data
            res.status(201).json({
                message: 'Payment address saved successfully!',
                data: newPaymentAddress,
            });
            
        } catch (error) { res.render('errors/error') }
    },
};

module.exports = paymentAddressController;
