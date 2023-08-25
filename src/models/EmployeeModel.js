const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Employee = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        // status: { type: String, required: true }
        // access_token: { type: String, require: true },
        // refresh_token: { type: String, require: true },
    },
    {
        timestamps: true
    }
);

// add plugin
Employee.plugin(mongooseDelete);

const Employees = mongoose.model("Employee", Employee);
module.exports = Employees;