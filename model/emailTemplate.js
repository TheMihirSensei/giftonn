const { Schema, model, } = require("mongoose")

const emailTemplateSchema = new Schema({
    templateName: {
        type: String,
        trim: true,
        min: [3, "at least required 3 character"],
        required: true
    },
    senderName: {
        type: String,
        trim: true,
        min: [3, "at least required 3 character"],
    },
    senderEmail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: "Email is required"
    },
    emailSubject: {
        type: String,
        trim: true,
        min: [3, "at least required 3 character"],
    },
    content: {
        type: String,
        min: [3, "at least required 3 character"],
    }

}, { timestamps: true })




module.exports = model("emailTemplate", emailTemplateSchema)