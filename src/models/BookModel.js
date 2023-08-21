const mongoose = require('mongoose')
const Book = new mongoose.Schema(
    {
        name: { type: String, required: true },
        year_creation: { type: Date, required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
        total: { type: Number, required: true },
        stock: { type: Number, required: true },
    },
    {
        timestamps: true
    }
);
const Books = mongoose.model("Book", Book);
module.exports = Books;