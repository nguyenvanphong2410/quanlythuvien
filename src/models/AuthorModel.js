const mongoose = require('mongoose')

const Author = new mongoose.Schema(
    {
        name: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        story: { type: String, required: true },
        deleted_at: {type: Date, default: null},
        book_ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }]
    },
    {
        timestamps: true
    }
);


const Authors = mongoose.model("Author", Author);
module.exports = Authors;