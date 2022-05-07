const Account = require('../model/Account')
var Transaction = require('../model/Transaction')
const bcrypt = require("bcrypt")
var clean_up = require("./CleanUp")

const TransactionService = {
create: async function (query) {
    try {
        var transaction = await new Transaction(query)
        await transaction.save()
        const clean = await clean_up.update_credit_or_debit(query.id, query.amount, "", query.type)
        return {transaction, status: clean.status} 
    } catch (e) {
        throw Error('Could not create Transaction')
    }
},
update: async function (id, query) {
    try {
        var transaction = await Transaction.findByIdAndUpdate(id, query)
        return transaction;
    } catch (e) {
        throw Error('Could not update Transaction')
    }
},
read: async function (id) {
    try {
        var transaction = await Transaction.findById(id)
        return transaction;
    } catch (e) {
        throw Error('Could not get Transaction')
    }
},
get: async function () {
    try {
        var transaction = await Transaction.find()
        return transaction;
    } catch (e) {
        throw Error('Could not update Transactions')
    }
},
delete: async function (id) {
    try {
        var transaction = await Transaction.findByIdAndDelete(id)
        await clean_up.Transaction_delete_clean_up(id)
        return transaction;
    } catch (e) {
        throw Error('Could not delete Transaction')
    }
},
fund_account: async function (query) {
    try {
        const {amount, account_number, narration} = query
        const ref_number = Math.floor(Math.random() * 100000000)
        const account = await Account.findOne({account_number: parseInt(account_number)})
        if(account){
        var transaction = await new Transaction({amount: parseInt(amount), account: account._id, owner: account.owner, account_number: parseInt(account_number), account_name: account.account_name, bank: "Sage", narration, ref_number})
        await transaction.save()
        const clean = await clean_up.update_credit_or_debit(query.account_number, query.amount,"", "credit")
        if(clean.status === "success"){
        await Transaction.findByIdAndUpdate(transaction._id, {status: "completed"})
        return {transaction, status: clean.status}   
        }else{
        await Transaction.findByIdAndUpdate(transaction._id, {status: "failed", narration: "Insufficient funds"})
        return {transaction, status: clean.status}}
    }else{
        return {transaction: null, status: ""}
    }
    } catch (e) {
        console.log(e)
        throw Error('Could not create Transaction')
    }
},

withdraw: async function (query) {
    try {
        const {amount, account_number, pin} = query
        const ref_number = Math.floor(Math.random() * 100000000)
        const account = await Account.findOne({account_number: parseInt(account_number)})
        const correct_pin = await bcrypt.compare(pin, account.transaction_pin)
        if(account){
        if(!correct_pin){
        return {transaction: null, status: "unauthorized"}
        }else{
        var transaction = await new Transaction({amount: parseInt(amount), account: account._id, owner: account.owner, account_number: parseInt(account_number), account_name: account.account_name, bank: "Sage", ref_number, type: "debit"})
        await transaction.save()
        const clean = await clean_up.update_credit_or_debit(account_number, amount,"", "debit")
        if(clean.status === "success"){
        await Transaction.findByIdAndUpdate(transaction._id, {status: "completed"})
        return {transaction, status: clean.status}   
        }else{
        await Transaction.findByIdAndUpdate(transaction._id, {status: "failed", narration: "Insufficient funds"})
        return {transaction, status: clean.status}}}
    }else{
        return {transaction: null, status: ""}
    }
    } catch (e) {
        console.log(e)
        throw Error('Could not create Transaction')
    }
},

transfer: async function (query) {
    try {
        const {amount, account_number, narration, pin, sender_account_number} = query
        const ref_number = Math.floor(Math.random() * 100000000)
        const account = await Account.findOne({account_number: parseInt(account_number)})
        const sender = await Account.findOne({account_number: parseInt(sender_account_number)})
        const correct_pin = await bcrypt.compare(pin, sender.transaction_pin)
        if(sender && !correct_pin){
        return {transaction: null, status: "unauthorized"}
        }else if(account && sender){
        const clean = await clean_up.update_credit_or_debit(account_number, amount, sender_account_number, "transfer")
        if(clean.status === "success"){
        var transaction = await new Transaction({amount: parseInt(amount), account: account._id, owner: account.owner, account_number: parseInt(account_number), account_name: account.account_name, bank: "Sage", narration, ref_number, type: "credit", status: "completed"})
        var n_transaction = await new Transaction({amount: parseInt(amount), account: sender._id, owner: sender.owner, account_number: parseInt(sender.account_number), account_name: sender.account_name, bank: "Sage", narration, ref_number, type: "debit", status: "completed"})
        await transaction.save()
        await n_transaction.save()
        return {transaction, status: clean.status}   
        }else{
        var n_transaction = await new Transaction({amount: parseInt(amount), account: sender._id, owner: sender.owner, account_number: parseInt(sender.account_number), account_name: sender.account_name, bank: "Sage", ref_number, type: "debit", status: "failed", narration: "Insufficient funds"})
        await n_transaction.save()
        return {transaction, status: clean.status}}
    }else{
        return {transaction: null, status: ""}
    }
    } catch (e) {
        console.log(e)
        throw Error('Could not create Transaction')
    }
}
}

module.exports = TransactionService



