var UserService = require('../services/User')    
var jwt = require("jsonwebtoken")
var config = require("../config")

const UserController = {

create: async function (req, res, next) {
    if(!req.body)
    return res.status(400).json({ status: 400, message: "No data provided" });
    try {
        var users = await UserService.create(req.body)
        if(users){
        return res.status(200).json({ status: 200, data: users, message: "Succesfully registered user" })
        }else{
        return res.status(400).json({ status: 400, data: {}, message: "Email already existed" })  
        }
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
login: async function (req, res, next) {
    if(!req.body)
    return res.status(400).json({ status: 400, message: "No data provided" });
    try {
        var user = await UserService.login(req.body)
        if(user.status === "Email not found"){
        return res.status(404).json({ status: 404, data: {}, message: "Email not found" })
        }else if(user.status === "Incorrect password"){
        return res.status(401).json({ status: 401, data: {}, message: "Unauthorized" })
        }else{
        return res.status(200).json({ status: 200, data: user, message: "Succesfully logged in" })};
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},

update: async function (req, res, next) {
    if(!req.body || !req.params.id)
    return res.status(400).json({ status: 400, message: "User id or data not data not provided" });
    try {
        var user = await UserService.update(req.params.id, req.body)
        return res.status(200).json({ status: 200, data: user, message: "Succesfully updated user" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
read: async function (req, res, next) {
    if(!req.params.id)
    return res.status(400).json({ status: 400, message: "User id not provided" });
    try {
        var user = await UserService.read(req.params.id)
        return res.status(200).json({ status: 200, data: user, message: "Success"});
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
get: async function (req, res, next) {
    try {
        var users = await UserService.get()
        return res.status(200).json({ status: 200, data: users, message: "Success" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
},
delete: async function (req, res, next) {
    if(!req.params.id)
    return res.status(400).json({ status: 400, message: "User id not provided" });
    try {
        var users = await UserService.delete(req.params.id)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully registered user" });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
}
}

module.exports = UserController

