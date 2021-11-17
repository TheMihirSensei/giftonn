const { Schema, model, } = require("mongoose")

const countrySchema = new Schema({
    shortName: {
        type: String,
        trim: true,
        required: true
    },
    longName: {
        type: String,
        trim: true,
        required: true
    },

    iso3: {
        type: String,
        trim: true,
        required: true
    },
    numCode: {
        type: Number,
        required: true
    },
    phoneCode: {
        type: Number,
        required: true
    },

}, { timestamps: true })




module.exports = model("country", countrySchema)