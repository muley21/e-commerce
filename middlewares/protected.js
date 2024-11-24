const jwt = require("jsonwebtoken")
// exports.adminProtected = (req, res, next) => {
//     const { admin } = req.cookies
//     console.log(req.cookies)

//     if (!admin) {
//         return res.status(401).json({ message: "No Cookie Found" })
//     }
//     jwt.verify(admin, process.env.JWT_KEY, (error, decode) => {
//         if (error) {
//             console.log(error)
//             return res.status(401).json({ message: "Invalid Token" })
//         }
//         req.admin = decode.adminId
//         next()
//     })
// }
exports.userProtected = (req, res, next) => {
    const { user } = req.cookies
    console.log(req.cookies)

    if (!user) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    jwt.verify(user, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })
}