const Product = require('../models/product.model')
const generateUniqueId = require('../utils/uidGenerator')

module.exports.createProduct = async (req, res) => {
    try {
        const {
            title,
            price,
            shortDescription,
            longDescription,
            actualPrice,
            discountPercent,
        } = req.body
        const product = new Product({
            title,
            price,
            shortDescription,
            longDescription,
            collectionType,
            actualPrice,
            discountPercent,
            id: `i` + generateUniqueId()
        })

        await product.save()
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
}

module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            data: products
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

module.exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all the required fields',
                error: 'Missing fields'
            })
        }

        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                error: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: product
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

module.exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                error: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
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

module.exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                error: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: product
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

module.exports.changeProductStatus = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide product id',
                error: 'Missing fields'
            })
        }
        const product = await Product.findById({ _id: id })
        product.isPublished = !product.isPublished
        await product.save()
        res.status(200).json({
            success: true,
            message: 'Product status updated successfully',
            data: product.isPublished
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
}

module.exports.updateProductInventory = async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    if (!req.body) {
        return res.status(400).json({ message: 'Missing inventory field in request body' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        product.inventory = req.body;
        await product.save();
        return res.status(200).json({
            success: true,
            message: 'Product inventory updated successfully',
            data: product
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });
    }
}

module.exports.getProductInventory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide product id',
                error: 'Missing fields'
            })
        }
        const product = await Product.findById({ _id: id })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                error: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Product inventory fetched successfully',
            data: product.inventory
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });
    }
} 