const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const config = require("./config")
const UserRouter = require("./router/User")
const TransactionRouter = require("./router/Transaction")
const AccountRouter = require("./router/Account")
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

mongoose.connect(config.db_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected")
}).catch(err => {
    console.log(err, "Could not connect to DB")
})

app.use(UserRouter)
app.use(TransactionRouter)
app.use(AccountRouter)


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})