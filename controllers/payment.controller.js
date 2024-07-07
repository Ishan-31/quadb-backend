const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports.handleSessionCreation = async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.title,
                images: [product.image],
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://looko.in/success",
        cancel_url: "https://looko.in/failure",
    });

    res.json({ id: session.id })
}

