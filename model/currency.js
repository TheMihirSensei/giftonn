const { Schema, model, } = require("mongoose")

const currencySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: String,
        trim: true,
        required: true
    },

    status: {
        type: String,
        enum: ["active", "deactive"],
        trim: true,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }


}, { timestamps: true })




module.exports = model("currency", currencySchema)