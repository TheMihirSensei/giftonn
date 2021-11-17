const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "vendors"
    },
    product_title: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    product_description: {
        type: String,

    },
    giftType: {
        type: String,
        enum: ["birthday", "aniversary", "love", "bestFriend", "special", "bestWishes"],
        defualt: "special"
    },
    productType: {
        type: String,
        enum: ["fashion", "jewellery", "gadget", "accessories", "others"]
    },
    categoryId: {
        type: Schema.Types.ObjectId
    },
    category: {
        type: String,
        trim: true
    },
    subCategoryId: {
        type: Schema.Types.ObjectId
    },
    subCategory: {
        type: String,
        trim: true
    },
    productImage: [
        {
            type: String,
            trim: true
        }
    ],
    store: [
        {
            type: Schema.Types.ObjectId,
            ref: "stores",
            required: true
        }
    ],
    price: {
        type: Number,
        min: [0, "please enter at lease 0 "],
        max: [999999999999999, "are you buying  country or what? "],
        required: true
    },
    qty: {
        type: Number,
        default: 1,
        required: true
    },
    serviceCharge: {
        type: Number,
        min: 0,
        max: [100, "You can't take service charge more than 100% service charge should be between 1 to 100"]
    },
    tags: [
        { type: String }
    ],
    isProductLaunched: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true })




module.exports = model("product", productSchema)