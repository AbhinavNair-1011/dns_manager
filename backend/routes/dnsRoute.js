const express=require("express");
const Router=express.Router();
const controller=require("../controllers/hostedListZone");
const authenticateUser=require("../util/jwt")



Router.post("/api/add-dns",authenticateUser, controller.addDnsRecord)
Router.get("/api/get-dns", authenticateUser,controller.getDns)
Router.delete("/api/delete-dns/:id",authenticateUser, controller.deleteDns)

module.exports=Router;