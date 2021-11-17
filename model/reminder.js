const { Schema, model, } = require("mongoose")

const reminderSchema = new Schema({
    purchaserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    relationship: {
        type: String,
        enum: ["friend", "sister", "brother", "mother", "uncle", "aunty", "father", "love", "other"]
    },
    occasion: {
        type: String,
        enum: ["aniversary", "birthday", "diwali", "holi", "eid", "other"]

    }

}, { timestamps: true })




module.exports = model("wishList", wishListSchema)