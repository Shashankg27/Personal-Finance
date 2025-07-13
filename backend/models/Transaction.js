const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "N/A"
    },
    amount: {
        type: Number,
        default: 0
    },
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    recurring: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const transactions = model('transactions', transactionSchema);

module.exports = transactions;