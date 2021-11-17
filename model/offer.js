const { Schema, model, } = require("mongoose")

const offerSchema = new Schema({
    offerName: {
        type: String,
        required: true
    },
    offerType: {
        type: String,
        enum: ["occasional", "seasonal", "regular"],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    dealImage: {
        type: String,
    },
    maxUser: {
        type: Number,
        required: true,
        min: [1, "at least have one user to apply"]
    },
    offerUsed: [
        {
            type: Schema.Types.ObjectId,
            ref: 'purchaser',
            required: true
        },
    ],
    description: {
        type: String,
        min: [3, "required at least 3 character"]
    },
    offerPercentage: {
        type: Number,
        min: [0, "offer must be atleast have more than 0"],
        max: [100, "product can't be free "]
    },

    product: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
    ],

}, { timestamps: true })




module.exports = model("offer", offerSchema)