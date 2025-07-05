const { Schema, model } = require("mongoose")

const budgetSchema = new Schema({
    category: {
        type: String,
    },
    budget: {
        type: Number,
        required: true
    }
});

const budget = model('budget', budgetSchema);

module.exports = budget;