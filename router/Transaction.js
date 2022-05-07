const express = require("express")
const router = express.Router()
const TransactionController = require("../controllers/Transaction")
const passport_login = require("../middleware/login_authentication")

const service = "/transaction"

//passport.authenticate('jwt', { session: false }),
router.post(service, passport_login.authenticate('jwt', { session: false }), TransactionController.create)

router.post(service+"/fund", passport_login.authenticate('jwt', { session: false }), TransactionController.fund_account)

router.post(service+"/transfer", passport_login.authenticate('jwt', { session: false }), TransactionController.transfer)

router.post(service+"/withdraw", TransactionController.withdraw)

router.patch(service+"/:id", passport_login.authenticate('jwt', { session: false }), TransactionController.update)

router.get(service, passport_login.authenticate('jwt', { session: false }), TransactionController.get)

router.get(service+"/:id", passport_login.authenticate('jwt', { session: false }), TransactionController.read)

router.delete(service+"/:id", passport_login.authenticate('jwt', { session: false }), TransactionController.delete)

module.exports = router
//2424345835