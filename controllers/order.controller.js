const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const User = require("../models/User")
const sendEmail = require("../utils/email")
const Product = require("../models/Product")
const Category = require("../models/Category")
const jwt = require('jsonwebtoken');


exports.addOrder = asyncHandler(async (req, res) => {
    const result = await Order.create(req.body)
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
    //send cookie
    res.cookie("user", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    // console.log(req.user)

    //send response
    res.json({
        message: "Add  Order Success", result: {
            userId: result.userId,
        }
    })
    // res.json({ Message: "order fetch success" })
})
exports.getUserOrders = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Order.find({ customer: id }).populate("products")
    res.json({ message: "Order Fetch Success", result })
})
exports.cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Order.findByIdAndUpdate(id, { status: "cancel" })
    const x = await Order.findById(id)
    const result = await User.findById(x.customer)
    //result.email
    sendEmail({
        to: result.email,
        message: `Your Order Cancel With Id ${id} Cancel Success`,
        subject: `order (${id}) Cancel`
    })
    res.json({ message: "Order Cancel Success" })
})

// exports.getOrderHistory = asyncHandler(async (req, res) => {
//     const userId = req.user._id;  // Assuming user is authenticated and req.user is available

//     // Fetch orders for the authenticated user
//     const result = await Order.find({ customer: userId })
//         .populate("customer")       // Populate customer details
//         .populate("products")       // Populate products if needed
//         .sort({ createdAt: -1 });   // Sort by latest orders

//     if (!result || result.length === 0) {
//         return res.status(404).json({ message: "No orders found for this user." });
//     }

//     // Send response
//     res.json({ message: "Order History", result });
// });


exports.getOrderHistory = async (req, res) => {
    // try {
    const { userId } = req.body
    const result = await Order.find({ customer: req.user }).populate("customer").populate("category").sort({ createdAt: -1 })
    res.json({ message: "Order History", result })
    const { id } = req.params;

    //     const orders = await Order.find({ customer: req.user }).populate("customer").populate("products").sort({ createdAt: -1 });

    //     if (!orders || orders.length === 0) {
    //         return res.status(400).json({ message: 'No orders found for this user.' });
    //     }

    //     res.status(200).json({ messge: "Order Fetch succuess", result: orders });
    // } catch (error) {
    //     console.error('Error fetching order history:', error);
    //     res.status(500).json({ message: 'Server error. Please try again later.' });
    // }
};




