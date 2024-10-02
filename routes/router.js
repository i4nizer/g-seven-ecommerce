const express = require('express')
const router = express.Router()
const routeController = require('../controllers/route.controller')



router.get('/', routeController.index)



module.exports = router