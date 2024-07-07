const {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    changeOrderStatus } = require('../controllers/order.controller')
const router = require('express').Router()

router.post('/', createOrder)
router.get('/all', getOrders)
router.get('/:id', getOrder)
router.patch('/:id', updateOrder)
router.delete('/:id', deleteOrder)
router.patch('/:id/status', changeOrderStatus)

module.exports = router
