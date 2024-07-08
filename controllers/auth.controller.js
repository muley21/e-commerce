const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User = require("../models/User")
const sendEmail = require("../utils/email")

exports.getAllUsers= async(req,res)=>{
    const result= await User.find(req.body)
    res.json({message: "User Fetch Success", result}) 
}

exports.registerUser = asyncHandler(async (req,res)=>{
     const {password,email}=req.body
     const isFound=await User.findOne({email})
     if(isFound){
        return res.status(400).json({message:"Email Already Exist"})
     }
     const hashPass = await bcrypt.hash(password,10)
     await User.create({...req.body, password: hashPass, role:"customer"})
    //  Send Email
    await sendEmail({
        to:email , 
        subject: "Registration Success",
        message: `<h1>Welcome, ${req.body.name}.</h1>`
    })
    res.json({message: `${req.body.name} Register Success`})

})

exports.loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body
    // Authentication
    // 1 Verify Email
    //  2 verify Password

    // Authorization
    // 3 Generate Token
    // 4 Send Token With Coockie

    // step 1
    const result= await User.findOne({email})
    if(!result){
        return res.status(400).json({message:"Email Not found"})
    }

    // step 2

    const verify = await bcrypt.compare(password, result.password)
    if(!verify){
        return res.status(400).json({message:"Password  Not Match"})
    }
   
    // step 3
    const token = jwt.sign({ userId : result._id}, process.env.JWT_KEY, { expiresIn: "1d"})

    // step 4
    res.cookie("auth-token", token, { httpOnly: true })

    res.json({ message: "login success", result: {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
    }})

})

exports.logout = asyncHandler(async ( req, res)=> {
    res.clearCookie("auth-token")
    res.json({message: "LogOut Success"})
})