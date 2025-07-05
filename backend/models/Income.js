const { Schema, model } = require("mongoose")

const incomeSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    recurring: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    }
});

const income = model('income', incomeSchema);

module.exports = income;