
const cart = require('../controllers/cartController');
router = express.Router();

router.get('./cart', cart.cart);

module.exports = router;