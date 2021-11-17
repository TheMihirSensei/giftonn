const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const vendorSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: "Email is required"
    },
    phone: {
        type: Number,
        required: "Number is required you can't register without mobile number"
    },
    password: {
        type: String,
        required: "without password you can't register"
    },
    fullName: {
        type: String,
        minlength: 3,
        maxlength: 500,
        required: true
    },
    age: {
        type: Number,
        min: [10, "you are too small for creating accout in giftonn"],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
    },
    countryId: {
        type: Schema.Types.ObjectId,
        // required: true
    },
    country: {
        type: String,
        default: "INDIA"
    },
    address: {
        type: String,
        minlength: [5, "Please enter at least 5 character"]
    },
    status: {
        type: String,
        enum: ["active", "deactive"]
    },
    email_verify: {
        type: Boolean,
        required: true,
        default: false
    },

    // this is for verify the vendor from admin side 
    isVerify: {
        type: Boolean,
        required: true,
        default: false,
    }

}, { timestamps: true })


vendorSchema.pre('save', async function (next) {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
            next()
        }
    } catch (err) {
        next(err)
    }
})

module.exports = model("vendor", vendorSchema)