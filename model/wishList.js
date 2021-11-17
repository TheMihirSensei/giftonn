const { Schema, model, } = require("mongoose")

const wishListSchema = new Schema({
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
            }
        }
    ]

}, { timestamps: true })




module.exports = model("wishList", wishListSchema)