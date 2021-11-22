const { Schema, model, } = require("mongoose")

const storeSchema = new Schema({
    vendorId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    storeName: {
        type: String,
        trim: true,
        required: true
    },
    storeInfo: {
        type: String,
        min: [3, "at least required 3 characters"]
    },
    storeLogo: {
        type: String,
        default: 'https://www.logoarena.com/contestimages/public_new/4094/7943_1391240116_thehousestore.png'
    },
    storeImage: [{
        type: String,
        default: 'https://www.logoarena.com/contestimages/public_new/4094/7943_1391240116_thehousestore.png'
    }],
    storeCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    },
    storeCategory: {
        type: String,
        enum: ["fashion", "gadgets", "accessories", "jewellery", "other"]
    },
    storeCertificate: {
        type: String,
        default: 'https://www.logoarena.com/contestimages/public_new/4094/7943_1391240116_thehousestore.png'
    },
    locality: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: "Point",
            index: "2dsphere",
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
        formattedAddress: String,

    },
    status: {
        type: String,
        enum: ["active", "deactive"],
        default: 'active'
    },
    address: {
        type: String,
        min: [3, "at lease 3 character required"]
    },
    feedback: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "purchasers"
            },
            message: {
                type: String,

            },
            rating: {
                type: Number,
                min: [0, "you can't give negative rating"],
                max: [5, "you can't give more than 5 "]
            }
        }
    ],



}, { timestamps: true })





module.exports = model("store", storeSchema)