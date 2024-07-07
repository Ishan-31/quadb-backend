const {
    handleSessionCreation 
} = require('../controllers/payment.controller')
const router = require('express').Router()

router.post("/create-checkout-session", handleSessionCreation);

module.exports = router
