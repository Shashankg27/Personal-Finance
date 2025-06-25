const User = require("../models/User")

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

module.exports = { handleSignUp, handleSignIn }