var Account = require("../model/Account")
var clean_up = require("./CleanUp")

const AccountService = {
create: async function (query) {
    try {
        var account = await new Account(query)
        await account.save()
        return account;
    } catch (e) {
        throw Error('Could not create Account')
    }
},
update: async function (id, query) {
    try {
        var account = await Account.findByIdAndUpdate(id, query)
        return account;
    } catch (e) {
        throw Error('Could not update Account')
    }
},
read: async function (id) {
    try {
        var account = await Account.findById(id)
        return account;
    } catch (e) {
        throw Error('Could not get Account')
    }
},
get: async function () {
    try {
        var account = await Account.find()
        return account;
    } catch (e) {
        throw Error('Could not update Accounts')
    }
},
delete: async function (id) {
    try {
        var account = await Account.findByIdAndDelete(id)
        await clean_up.Account_delete_clean_up(id)
        return account;
    } catch (e) {
        throw Error('Could not delete Account')
    }
},
}

module.exports = AccountService