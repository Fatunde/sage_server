const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    security_question: {
        type: String
    },
    security_answer: {
        type: String
    },
    bvn: {
        type: Number
    },
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    }],
    id_link: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    passport_photo: {
        type: String
    }

}, { timestamps: true })


module.exports = mongoose.model("User", UserSchema)