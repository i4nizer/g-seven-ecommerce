const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

// Fetch data for the admin dashboard
const getAdminDashboard = async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();

    res.render('admin-dashboard', {
      productsCount,
      usersCount,
      ordersCount
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).send('Error loading dashboard');
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.render('admin-products', { products }); // Render products view
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Create a new product from request body
    await newProduct.save();
    res.status(201).send('Product created successfully');
  } catch (error) {
    res.status(500).send('Error creating product');
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedProduct);
  } catch (error) {
    res.status(500).send('Error updating product');
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send('Product deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting product');
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.render('admin-users', { users }); // Render users view
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    res.render('admin-orders', { orders }); // Render orders view
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedOrder);
  } catch (error) {
    res.status(500).send('Error updating order status');
  }
};

module.exports = {
  getAdminDashboard,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  deleteUser,
  getAllOrders,
  updateOrderStatus
};
