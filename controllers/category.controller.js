// const Category = require('../models/categoryModel');

const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const upload = require("../utils/upload");
const { checkEmpty } = require("../utils/checkEmpty");

// Get all categories with subcategories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ message: "Fetch category success", result: categories });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error });
    }
};

// Create a new category
const createCategory = expressAsyncHandler(async (req, res) => {
    // upload(req, res, async err => {

    // console.log(req.body);
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);

            return res.status(400).json({ message: "Multer error", err: err.message })
        }
        // console.log(req.file);
        const { name, desc, category, prize } = req.body
        const { error, isError } = checkEmpty({
            name, desc, category, prize
        })
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }

        await Category.create({ name, imageURL: req.file.filename, desc, category, prize, })
        return res.json({ message: "Category Create Success" })
    })

})

const handleSearch = expressAsyncHandler(async (req, res) => {
    const result = await Category.find({
        $or: [
            { name: { $regex: req.query.term, $options: "i" } },
            { desc: { $regex: req.query.term, $options: "i" } },
        ]
    })
    return res.json({ messsage: "Search Fetch Successfully", result })
})

module.exports = { getCategories, createCategory, handleSearch };
