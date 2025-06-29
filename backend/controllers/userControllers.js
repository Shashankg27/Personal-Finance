const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { createToken, validateToken } = require("../services/authentication");
const Investments = require("../models/Investment");
const SECRET = process.env.JWT_SECRET;

const handleSignUp = async (req, res) => {
    console.log(req.body);

    try{
        await User.create({
            name: req.body.fname + ' ' + req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        return res.status(201).json({ success: "Signup Successful" });
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

const handleSignIn = async (req, res) => {
    const { username, password } = req.body;

    try{
        const token = await User.checkPasswordAndCreateToken(username, password);
        return res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
        }).json({ success: "Signin Successful" });
    }
    catch(err){
        return res.status(401).json({ error: "Invalid username or password" });
    }
}

const handleAddInvestment = async (req, res) => {
    try{
        const token = req.cookies.token;
        const user = validateToken(token);
        await Investments.create({
            name: req.body.name,
            note: req.body.note,
            date: req.body?.date,
            principal: req.body.principal,
            ROI: req.body.ROI,
            category: req.body.category,
            userId: user._id
        });

        return res.status(201).json({ success: "Investment created Successfully" });
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

const handleDeleteInvestment = async (req, res) => {
    try{
        const token = req.cookies.token;
        const user = validateToken(token);
        
        await Investments.findOneAndDelete({
            name: req.body.name,
            userId: user._id
        });

        return res.status(201).json({ success: "Investment deleted Successfully" });
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

const handleAddCategory = async (req, res) => {
    const { categoryData } = req.body;

    try{
        const prevToken = req.cookies.token;
        console.log(req.cookies);
        const prevUser = validateToken(prevToken);
        const type = categoryData.type;
        const user = await User.findOne({ _id: prevUser._id });
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const categoryExists = user[type].some(
            (cat) => cat.name.toLowerCase() === categoryData.name.toLowerCase()
        );
        if(categoryExists){
            return res.status(409).json({ success: false, message: "Category already exists" });
        }

        user[type].push(categoryData);
        await user.save();
        
        const token = createToken(user);

        console.log(token);
        console.log(validateToken(token));

        return res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
        }).json({ success: true, message: "Category added successfully"});
    }
    catch(error){
        console.error("Error adding category:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const handleDeleteCategory = async (req, res) => {
    const { name, type } = req.body.category;
    
    try{
        const prevToken = req.cookies.token;
        console.log(req.cookies);
        const prevUser = validateToken(prevToken);
        const user = await User.findOne({ _id: prevUser._id });
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        const categoryIndex = user[type].findIndex(
            (cat) => cat.name.toLowerCase() ===  req.body.category.name.toLowerCase()
        );
        console.log(user[type]);
        console.log(req.body.category);
        console.log(categoryIndex);
        if(categoryIndex === -1){
            return res.status(404).json({ success: false, message: "Category not found!" });
        }
        user[type].splice(categoryIndex, 1);

        await user.save();
        
        const token = createToken(user);

        console.log(token);
        console.log(validateToken(token));

        return res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
        }).json({ success: true, message: "Category removed successfully"});
    }
    catch(error){
        console.error("Error removing category:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = { handleSignUp, handleSignIn, handleAddCategory, handleAddInvestment, handleDeleteCategory }