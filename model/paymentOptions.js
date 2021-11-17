const { Schema, model, } = require("mongoose")

const paymentOptionSchema = new Schema({
    purchaserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    cardDetails: [
        {
            cardNumber: {
                type: Number,
                required: true
            },
            HolderName: {
                type: String,
                required: true
            },
            cvv: {
                type: Number,
                required: true
            },
            expireDate: {
                type: String,
                required: true
            }
        }
    ],
    upi: [
        {
            type: String,
            trim: true,
            unique: true,
            match: [/^\w.+@\w+$/, 'please enter valid UPI ID']
        }
    ],
    netBanking: [
        {
            bankName: String,
            trim: true,
            required: true

        }
    ]

}, { timestamps: true })




module.exports = model("paymentOption", paymentOptionSchema)