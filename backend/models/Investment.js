const mongoose = require('mongoose');

const investmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    note: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    principal: {
        type: Number,
        required: true
    },
    ROI: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    }
});

const Investments = mongoose.model('investments', investmentSchema);

module.exports = Investments;