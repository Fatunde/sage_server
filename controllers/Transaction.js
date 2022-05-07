var TransactionService = require('../services/Transaction')    

const TransactionController = {
create: async function (req, res, next) {
    if(!req.body)
    return res.status(400).json({ status: 400, message: "No data provided" });
    try {
        var transactions = await TransactionService.create(req.body)
        if(transactions.status === "success"){
        return res.status(200).json({ status: 200, data: transactions, message: "Succesfully registered Transaction" });
        }else{
        return res.status(403).json({ status: 403, data: transactions, message: "Insuffient fund" });
        }
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},

fund_account: async function (req, res, next) {
    if(!req.body)
    return res.status(400).json({ status: 400, message: "No data provided" });
    try {
        var transactions = await TransactionService.fund_account(req.body)
        if(!transactions.status){
        return res.status(404).json({ status: 404, data: {}, message: "Account number not found" });
        }else if(transactions.status === "success"){
        return res.status(200).json({ status: 200, data: transactions, message: "Succesfully registered Transaction" });
        }else{
        return res.status(403).json({ status: 403, data: transactions, message: "Insuffient fund" });
        }
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},

withdraw: async function (req, res, next) {
    if(!req.body)
    return res.status(400).json({ status: 400, message: "No data provided" });
    try {
        var transactions = await TransactionService.withdraw(req.body)
        if(!transactions.status){
        return res.status(404).json({ status: 404, data: {}, message: "Account number not found" });
        }else if(transactions.status === "unauthorized"){
        return res.status(401).json({ status: 401, data: {}, message: "Wrong pin" });
        }else if(transactions.status === "success"){
        return res.status(200).json({ status: 200, data: transactions, message: "Succesfully registered Transaction" });
        }else{
        return res.status(403).json({ status: 403, data: transactions, message: "Insuffient fund" });
        }
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},

transfer: async function (req, res, next) {
    if(!req.body)
    return res.status(400).json({ status: 400, message: "No data provided" });
    try {
        var transactions = await TransactionService.transfer(req.body)
        if(!transactions.status){
        return res.status(404).json({ status: 404, data: {}, message: "Account number not found" });
        }else if(transactions.status === "unauthorized"){
        return res.status(401).json({ status: 401, data: {}, message: "Wrong pin" });
        }else if(transactions.status === "success"){
        return res.status(200).json({ status: 200, data: transactions, message: "Succesfully registered Transaction" });
        }else{
        return res.status(403).json({ status: 403, data: transactions, message: "Insuffient fund" });
        }
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},

update: async function (req, res, next) {
    if(!req.body || !req.params.id)
    return res.status(400).json({ status: 400, message: "Transaction id or data not data not provided" });
    try {
        var transaction = await TransactionService.update(req.params.id, req.body)
        return res.status(200).json({ status: 200, data: transaction, message: "Succesfully updated Transaction" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
read: async function (req, res, next) {
    if(!req.params.id)
    return res.status(400).json({ status: 400, message: "Transaction id not provided" });
    try {
        var transaction = await TransactionService.read(req.params.id)
        return res.status(200).json({ status: 200, data: transaction, message: "Success"});
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
get: async function (req, res, next) {
    try {
        var transactions = await TransactionService.get()
        return res.status(200).json({ status: 200, data: transactions, message: "Success" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
delete: async function (req, res, next) {
    if(!req.params.id)
    return res.status(400).json({ status: 400, message: "Transaction id not provided" });
    try {
        var transactions = await TransactionService.delete(req.params.id)
        return res.status(200).json({ status: 200, data: transactions, message: "Succesfully registered Transaction" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
}
}

module.exports = TransactionController

