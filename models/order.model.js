const { Schema, model } = require('mongoose')

const orderSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        completeAddress: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        address2: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'shipped', 'delivered', 'cancelled', 'order placed'],
            // pending means payment-failed
        },
        items: {
            type: Array,
            default: [],
            required: true,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

const Order = model('order', orderSchema)
module.exports = Order