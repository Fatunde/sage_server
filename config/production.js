module.exports = { 
    db_string : process.env.DB_STRING || "mongodb+srv://Damilare:Damilare@cluster0.ignbg.mongodb.net/sageBank?retryWrites=true&w=majority",
    jwt_secret : process.env.JWT_SECRET || "umbrella_prod"
}