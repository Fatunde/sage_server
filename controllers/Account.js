var AccountService = require('../services/Account')    

const AccountController = {
create: async function (req, res, next) {
    if(!req.body)
    return res.status(400).json({ status: 400, message: "No data provided" });
    try {
        var accounts = await AccountService.create(req.body)
        return res.status(200).json({ status: 200, data: accounts, message: "Succesfully registered Account" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},

update: async function (req, res, next) {
    if(!req.body || !req.params.id)
    return res.status(400).json({ status: 400, message: "Account id or data not data not provided" });
    try {
        var account = await AccountService.update(req.params.id, req.body)
        return res.status(200).json({ status: 200, data: account, message: "Succesfully updated Account" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
read: async function (req, res, next) {
    if(!req.params.id)
    return res.status(400).json({ status: 400, message: "Account id not provided" });
    try {
        var Account = await AccountService.read(req.params.id)
        return res.status(200).json({ status: 200, data: Account, message: "Success"});
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
get: async function (req, res, next) {
    try {
        var Accounts = await AccountService.get()
        return res.status(200).json({ status: 200, data: Accounts, message: "Success" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
delete: async function (req, res, next) {
    if(!req.params.id)
    return res.status(400).json({ status: 400, message: "Account id not provided" });
    try {
        var Accounts = await AccountService.delete(req.params.id)
        return res.status(200).json({ status: 200, data: Accounts, message: "Succesfully registered Account" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
}
}

module.exports = AccountController

