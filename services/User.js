const AccountService = require('../services/Account')
var User = require('../model/User')
var clean_up = require("./CleanUp")
var moment = require("moment")
var jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config").jwt_secret
const bcrypt = require("bcrypt")


const UserService = {
create: async function (query) {
    try {
        var dated = moment().add("6", "months")
        const {full_name, date_of_birth, phone_number, bvn, type, currency, transaction_pin, email, password} = query
        const exist = await User.findOne({email})
        if(exist){
        return null
        }else{
        const number = Math.floor(Math.random() * 10000000000)
        const hashedPin = await bcrypt.hash(transaction_pin, 10)
        const hashedPassword = await bcrypt.hash(password, 10)
        var user = await new User({full_name, date_of_birth, phone_number, bvn, email,  password: hashedPassword})
        const account = await AccountService.create({account_name: full_name, phone_number, account_number: number, type, currency, owner: user._id, transaction_pin: hashedPin, bvn, dormant_date: new Date(dated)})
        await user.accounts.push(account._id)
        await user.save()
        await account.save()
        return user}
    } catch (e) {
        throw Error('Could not create user')
    }
},
login: async function (query) {
    try {
        const {email, password} = query
        const user_email = await User.findOne({email: email})
        if(!user_email){
        return {status: "Email not found"}
        }else{
        const real_user = await bcrypt.compare(password, user_email.password)
        if(!real_user){
        return {status: "Incorrect password"}
        }else{
        const user = await User.findById(user_email._id)
        const auth_user = await jwt.sign({user: {_id: user._id}}, JWT_SECRET, {expiresIn: '2d'})
        return auth_user
        }}
    } catch (e) {
        console.log(e)
        throw Error('Could not create user')
    }
},
update: async function (id, query) {
    try {
        var user = await User.findByIdAndUpdate(id, query)
        return user;
    } catch (e) {
        throw Error('Could not update user')
    }
},
read: async function (id) {
    try {
        var user = await User.findById(id)
        return user;
    } catch (e) {
        throw Error('Could not get user')
    }
},
get: async function () {
    try {
        var user = await User.find()
        return user;
    } catch (e) {
        throw Error('Could not update users')
    }
},
delete: async function (id) {
    try {
        var user = await User.findByIdAndDelete(id)
        await clean_up.user_delete_clean_up(id)
        return user;
    } catch (e) {
        throw Error('Could not delete user')
    }
},
}

module.exports = UserService