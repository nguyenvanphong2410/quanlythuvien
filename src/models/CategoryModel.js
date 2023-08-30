const mongoose = require('mongoose')
const Category = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        deleted_at: {type: Date, default: null},
    },
    {
        timestamps: true
    }
);
const Categories = mongoose.model("Categories", Category);
module.exports = Categories;