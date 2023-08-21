const mongoose = require('mongoose')
const Category = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true
    }
);
const Categories = mongoose.model("Categorie", Category);
module.exports = Categories;