// auth.middleware.js
const isAdmin = (req, res, next) => {
    // Assuming user role is stored in the cookie or session
    if (req.cookies.userRole === 'admin') {
      next(); // User is admin, proceed to the route
    } else {
      res.status(403).send('Access denied. Admins only.');
    }
  };
  
  module.exports = { isAdmin };
  