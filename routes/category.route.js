const express = require('express');
const { getCategories, createCategory, handleSearch } = require('./../controllers/category.controller');

const router = express.Router();

router.get('/get-category', getCategories);
router.post('/add-category', createCategory);
router.get("/handle-search", handleSearch)


module.exports = router;
