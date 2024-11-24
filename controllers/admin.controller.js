const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const Product = require("../models/Product")
const upload = require("../utils/upload")
const Order = require("../models/Order")

exports.getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find({ role: "customer" })
    res.json({ message: "User Fetch Success", result })
})
exports.addUsers = asyncHandler(async (req, res) => {
    await User.create(req.body)
    res.json({ message: "User Add Success" })
})
exports.updateUsers = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "User Update Success" })
})
exports.deleteUsers = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "User Delete Success" })
})

exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.find()
    res.json({ message: "Product Fetch Success", result })
})
exports.addProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.json({ message: "Multer Error", err })
        }
        console.log(req.file);
        if (req.file) {
            console.log("inside");
            await Product.create({ ...req.body, imageURL: req.file.filename, })
            return res.json({ message: "Product Add Success" })
        } else {
            return res.status(400).json({ message: "Thumb Image Is Required" })
        }

    })
})
exports.updateProduct = asyncHandler(async (req, res) => {
    // const {id}= req.params
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "Product Update Success" })
})
exports.deleteProduct = asyncHandler(async (req, res) => {
    // const {id}= req.params
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product delete Success" })
})

// exports.getOrders= asyncHandler(async (req , res)=> {
//     const result = await Product.find()
//     res.json({message: "Product Fetch Success", result})
// })

// exports.addOrder= asyncHandler(async (req, res)=> {
//     await Order.create(req.body)
//     res.json({message: "Order Added Success", result})
// })
// exports.updateOrder= asyncHandler(async (req, res)=> {
//     const {id}= req.params
//     await Order.findByIdAndUpdate(req.params.id, req.body)
//     res.json({message: "Order update Success", result})
// })
// exports.deleteOrder= asyncHandler(async (req, res)=> {
//     const {id}= req.params
//     await Order.findByIdAndUpdate(req.params.id)
//     res.json({message: "Order delete Success", result})
// })

// exports.getAllOrders= asyncHandler(async (req, res)=> {
//     const {result}= await Order.find(req.body)
//     res.json({message: "Order Added Success" , result})
// })

exports.getAllOrders = asyncHandler(async (req, res) => {
    const { id, products, status, customer } = req.body
    const result = await Order.find().populate("products")
    res.json({ message: "Order Fetch Success", result })
})