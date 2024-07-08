const router = require("express").Router()
const authController=require("./../controllers/auth.controller")

router
    .get("/get",authController.getAllUsers)
    .post("/register",authController.registerUser)
    .post("/login",authController.loginUser)
    .post("/logout",authController.logout)
module.exports=router