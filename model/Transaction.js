const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    type: {
        type: String,
        enum: ["credit", "debit"],
        default: "credit"
    },
    status: {
        type: String,
        enum: ["pending", "completed", "declined", "failed"],
        default: "pending"
    },
    account_number: {
        type: Number,
        required: true
    },
    account_name: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    ref_number: {
        type: String,
        required: true
    },
    narration: {
        type: String
    }

}, { timestamps: true })


module.exports = mongoose.model("Transaction", TransactionSchema)