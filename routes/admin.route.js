const router = require("express").Router()
const adminController=require("./../controllers/admin.controller")

router
    .get("/get",adminController.getAllUsers)
    .post("/new-user",adminController.addUsers)
    .put("/update-user/:id",adminController.updateUsers)
    .delete("/delete-user/:id",adminController.deleteUsers)

    .get("/products", adminController.getAllProducts)
    .post("/add-product", adminController.addProduct)
    .put("/update-product/:id", adminController.updateProduct)
    .delete("/delete-product/:id", adminController.deleteProduct)

    .get("/getOrder", adminController.getAllOrders)



module.exports=router