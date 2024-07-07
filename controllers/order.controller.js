const Order = require('../models/order.model')
const Product = require('../models/product.model')
const generateUniqueId = require('../utils/uidGenerator')

module.exports.createOrder = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            completeAddress,
            pincode,
            paymentMethod,
            items,
            address,
            address2,
            landmark,
            city,
            state
        } = req.body
        if (!fullName || !email || !phone || !completeAddress || !pincode || !paymentMethod || !items || !address || !landmark || !city || !state || !address2) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all the required fields',
                error: 'Missing fields'
            })
        }
        const order = new Order({
            fullName,
            email,
            phone,
            completeAddress,
            pincode,
            paymentMethod,
            items,
            address,
            landmark,
            city,
            state,
            address2,
            id: `o` + generateUniqueId()
        })

        await order.save()
        const cartProducts = order.items.map((item) => {
            return {
                _id: item.id,
                size: item.size,
                quantity: item.quantity
            }
        })
        for (let i = 0; i < cartProducts.length; i++) {
            const product = await Product.findById(cartProducts[i]._id)
            let inv = product.inventory
            inv.map((item) => {
                if (item.size === cartProducts[i].size) {
                    item.stock = item.stock - cartProducts[i].quantity
                }
            })
            await Product.findByIdAndUpdate(cartProducts[i]._id, { inventory: inv })
        }
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
}

module.exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
}

module.exports.getOrder = async (req, res) => {
}

module.exports.updateOrder = async (req, res) => {
}

module.exports.deleteOrder = async (req, res) => {

}

module.exports.changeOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        if (!id || !status) {
            return res.status(400).json({
                success: false,
                message: 'Please provide order id and status',
                error: 'Missing fields'
            })
        }
        const order = await Order.findById({ _id: id })
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
                error: 'Order not found'
            })
        }

        order.status = status
        await order.save()
        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
}

