const { Schema, model,} = require("mongoose");


const goalSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    note:{
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    targetDate:{
        type: Date,
        required: true
    },
    amount:{
        type: Number,
        required: true

    },
    userId:{
        type: Schema.ObjectId,
        required: true
    },
    complete:{
        type: Boolean,
        default: false
    }

});
const goals = model("goals",goalSchema);
module.exports = goals

