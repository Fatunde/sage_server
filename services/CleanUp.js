var Account = require('../model/Account')

const CleanUpService = {
user_delete_clean_up: async function (id) {
    try {
      const accounts = await Account.find({owner: id})
      accounts.forEach(async i =>{
         await Account.findByIdAndDelete(i._id)
      })
    } catch (e) {
        throw Error('Could not clean up')
    }
},
update_credit_or_debit: async function (account_number, amount, sender, type) {
    try {
      const getAccount = await Account.findOne({account_number: parseInt(account_number)})
      const getSender = sender && await Account.findOne({account_number: parseInt(sender)})
      const balance = getAccount.balance
      if(type === "transfer"){
        if(getSender.balance < parseInt(amount)){
            return {status: "failed", narration: "Insufficient fund"}
            }else{
            await Account.findByIdAndUpdate(getAccount._id, {balance: balance+parseInt(amount)}) 
            await Account.findByIdAndUpdate(getSender._id, {balance: getSender.balance-parseInt(amount)}) 
            return {status: "success", narration: "debit", account: getAccount}
            }
      }else if(type === "credit"){
        await Account.findByIdAndUpdate(getAccount._id, {balance: balance+parseInt(amount)})
        return {status: "success", account: getAccount}
      }else if(type === "debit"){
        if(balance < parseInt(amount)){
        return {status: "failed", narration: "Insufficient fund"}
        }else{
        await Account.findByIdAndUpdate(getAccount._id, {balance: balance-parseInt(amount)}) 
        return {status: "success", narration: "debit", account: getAccount}
        }
      }else{
          return null
      }
    } catch (e) {
        console.log(e)
        throw Error('Could not clean up')
    }
},
}

module.exports = CleanUpService