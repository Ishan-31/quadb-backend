const { getProducts, getProduct,
    createProduct, updateProduct,
    deleteProduct, changeProductStatus,
    updateProductInventory,
    getProductInventory } = require('../controllers/product.controller')
const router = require('express').Router()

router.post('/', createProduct)
router.get('/all', getProducts)
router.get('/:id', getProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.patch('/:id/status', changeProductStatus)
router.patch('/:id/inventory', updateProductInventory)
router.get('/:id/inventory', getProductInventory)


module.exports = router
