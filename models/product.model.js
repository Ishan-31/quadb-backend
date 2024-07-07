const { Schema, model } = require('mongoose')

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
            unique: true,
        },
        defaultImage: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            required: true,
        },
        discountPercent: {
            type: Number,
            default: 0,
        },
        actualPrice: {
            type: Number,
            default: 0,
        },
        size: {
            type: String,
        },
        stockQuantity: {
            type: Number,
            default: 0,
        },
        thickness: {
            type: String,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        longDescription: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            default: [],
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        inventory: {
            type: [
                {
                    size: String,
                    stock: Number
                }
            ],
            default: [
                {
                    size: 'default',
                    stock: 0
                },
            ],
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

const Product = model('product', productSchema)
module.exports = Product