const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const User = require("../models/User")
const sendEmail = require("../utils/email")

exports.addOrder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.json({ Message: "order fetch success" })
})
exports.getUserOrders = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Order.find({ customer: id }).populate("products")
    res.json({message: "Order Fetch Success",result})
})
exports.cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params
      await Order.findByIdAndUpdate(id, {status: "cancel"})
      const x = await Order.findById(id)
      const result = await User.findById(x.customer)
      //result.email
      sendEmail({
        to : result.email, 
        message:`Your Order Cancel With Id ${id} Cancel Success`,
        subject: `order (${id}) Cancel`
    })
    res.json({message: "Order Cancel Success"})
})                                                                                                                                                                                                                                                                                                                                                                                               