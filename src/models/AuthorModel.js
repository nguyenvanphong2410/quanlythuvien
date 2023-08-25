const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');

const Author = new mongoose.Schema(
    {
        name: { type: String, required: true },
        date_of_birth: { type: Date, required: true },
        story: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

// add plugin
Author.plugin(mongooseDelete);

const Authors = mongoose.model("Author", Author);
module.exports = Authors;