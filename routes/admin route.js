const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller'); // Import the controller

// Middleware for authentication (to ensure only admin can access these routes)
const { isAdmin } = require('../middleware/auth.middleware');

// Admin Dashboard Route
router.get('/dashboard', isAdmin, adminController.getAdminDashboard); // Fetch admin dashboard data

// Product Management Routes
router.get('/products', isAdmin, adminController.getAllProducts); // Get all products
router.post('/products', isAdmin, adminController.createProduct); // Create a new product
router.put('/products/:id', isAdmin, adminController.updateProduct); // Update a product
router.delete('/products/:id', isAdmin, adminController.deleteProduct); // Delete a product

// User Management Routes
router.get('/users', isAdmin, adminController.getAllUsers); // Get all users
router.delete('/users/:id', isAdmin, adminController.deleteUser); // Delete a user

// Order Management Routes
router.get('/orders', isAdmin, adminController.getAllOrders); // Get all orders
router.put('/orders/:id', isAdmin, adminController.updateOrderStatus); // Update order status

module.exports = router;
