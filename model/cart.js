const { Schema, model, } = require("mongoose")

const cartSchema = new Schema({
    purchaserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            qty: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]

}, { timestamps: true })



module.exports = model("cart", cartSchema)