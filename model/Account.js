const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AccountSchema = new Schema({
    account_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    account_number: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0.00
    },
    type: {
        type: String,
        required: true,
        enum: ["savings", "current" ],
        default: "savings"
    },
    currency: {
        type: String,
        required: true,
        enum: ["naira", "dollars", "pounds", "euro"],
        default: "naira"
    },
    account_status: {
        type: String,
        required: true,
        enum: ["active", "closed", "dormant", "deactivated"],
        default: "active"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transaction_pin: {
        type: String,
        required: true
    },
    bvn: {
        type: Number
    },
    id_link: {
        type: String,
    },
    dormant_date: {
        type: Date,
        required: true
    },
    passport_photo: {
        type: String,
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: "Transaction"
    }]

}, { timestamps: true })


module.exports = mongoose.model("Account", AccountSchema)