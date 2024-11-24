// const { getUserorders, addOrder} = require("./../controllers/order.controller")

const { getUserOrders, addOrder, cancelOrder, getOrderHistory } = require("../controllers/order.controller")

const router = require("express").Router()

    .post("/place-order", addOrder)
    .get("/user-order/:id", getUserOrders)
    .put("/cancel-order/:id", cancelOrder)
    .get("/get-order-history", getOrderHistory)
// .put("/update-order/:id", orderController.updateOrder)
// .delete("/delete-order/:id", orderController.deleteOrder)

module.exports = router