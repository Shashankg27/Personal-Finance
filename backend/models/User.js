const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/authentication');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    incomeCategories: {
        type: Array,
        default: []
    },
    expenseCategories: {
        type: Array,
        default: []
    },
    investmentCategories: {
        type: Array,
        default: []
    },
    salt: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();  // <-- add return

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.salt = salt;
        this.password = hashedPassword;
        next();
    }
    catch(err){
        next(err);
    }
});

userSchema.static("checkPasswordAndCreateToken", async function(username, password){
    const user = await this.findOne({ username });
    if(!user) throw new Error("User not found!");
    const hashedPass = await bcrypt.hash(password, user.salt);

    if(hashedPass !== user.password) throw new Error("Incorrect Password");
    
    const token = createToken(user);
    return token;
});

const User = mongoose.model('User', userSchema);

module.exports = User;