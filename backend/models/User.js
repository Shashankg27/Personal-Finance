const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    salt: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(this.password, salt);
    this.salt = salt;
    this.password = hashedPassword;
    
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;