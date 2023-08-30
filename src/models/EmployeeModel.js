const mongoose = require('mongoose')

const Employee = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        status: { type: String, required: true, default: '0' },
        deleted_at: {type: Date, default: null}
        // access_token: { type: String, require: true },
        // refresh_token: { type: String, require: true },
    },
    {
        timestamps: true
    }
);



const Employees = mongoose.model("Employee", Employee);
module.exports = Employees;