const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },  // laptop     chips
    imageURL: { type: String, required: true }, //latop.png   chips.png
    // image: { type: String, required: true }, //latop.png   chips.png
    // main: { type: String, required: true }, //latop.png   chips.png
    desc: { type: String, required: true },  // xyz    xyz
    category: { type: String, }, // electronics        child food 
    prize: { type: Number, }, // electronics        child food 
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
