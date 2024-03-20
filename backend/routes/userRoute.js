const express=require("express");
const Router=express.Router();
const controller=require("../controllers/user");

const encryptPassword=require("../util/bcrypt")


Router.post("/api/addUser",encryptPassword,controller.addUser)
Router.post("/api/login", controller.validateUser)

module.exports=Router;