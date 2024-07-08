const express=require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

// 1 connect DB
mongoose.connect(process.env.MONGO_URL)
const app = express()

// 2 middleware
app.use(express.static("uploads"))
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

// 3 User Routes
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", require("./routes/admin.route"))
app.use("/api/order", require("./routes/order.route"))

// 4 404 route
app.use("*", async(req, res)=>{
    res.status(404).json({message:"Resource Not found"})
})

// 5 Error Handler Route
app.use((error,req,res,next)=>{
    res.status(500).json({message: error.message || "Something went wrong"})
})

// 6 start server   
mongoose.connection.once("open",()=>{
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})