const { Schema, model, } = require("mongoose")

const notificationSchema = new Schema({
    title: {
        type: String,
        trim: true,
        min: [3, "at least required 3 character"],
        required: true
    },
    description: {
        type: String,
        trim: true,
        min: [3, "at least required 3 character"],
    },
    type: {
        type: String,
        enum: ['order', 'offer', 'giftonnSpecial']
    },
    bannerImg: {
        type: String
    }


}, { timestamps: true })




module.exports = model("notification", notificationSchema)