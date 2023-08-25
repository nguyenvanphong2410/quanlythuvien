const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');

const Book = new mongoose.Schema(
    {
        name: { type: String, required: true },
        year_creation: { type: Date, required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
        total: { type: Number, required: true },
        stock: { type: Number, required: true },
        categories_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories'
        }
    },
    {
        timestamps: true
    }
);

// add plugin
Book.plugin(mongooseDelete);

const Books = mongoose.model("Book", Book);
module.exports = Books;