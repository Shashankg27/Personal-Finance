const { Schema, model,} = require("mongoose");


const loanSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    from:{
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    timePeriod:{
        type: Number,
        required: true
    },
    principal:{
        type: Number,
        required: true
    },
    userId:{
        type: Schema.ObjectId,
        required: true
    },
    ROI:{
        type: Number,
        default: 0
    },
    complete: {
        type: Boolean,
        default: false
    }
});

const loans = model("loans", loanSchema);
module.exports = loans;