const express = require("express")
const router = express.Router()
const UserController = require("../controllers/User")
const passport_login = require("../middleware/login_authentication")

const service = "/account"

//passport.authenticate('jwt', { session: false }),
router.post(service, UserController.create)

router.patch(service+"/id", passport_login.authenticate('jwt', { session: false }), UserController.update)

router.get(service, passport_login.authenticate('jwt', { session: false }), UserController.get)

router.get(service+"/:id", passport_login.authenticate('jwt', { session: false }), UserController.read)

router.delete(service+"/:id", passport_login.authenticate('jwt', { session: false }), UserController.delete)

module.exports = router