const router = require('express').Router()
const auth = require('../middlewares/auth')


// UNAUTHENTICATED ROUTES
router.use('/product', require('./product.route'))
router.use('/order', require('./order.route'))
router.use('/payment', require('./payment.route'))


// AUTHENTICATED ROUTES
router.use(auth)

module.exports = router