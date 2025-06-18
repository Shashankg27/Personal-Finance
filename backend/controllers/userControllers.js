const User = require("../models/User")

const handleSignUp = async (req, res) => {
    console.log(req.body);

    await User.create({
        name: req.body.fname + ' ' + req.body.lname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
}

module.exports = { handleSignUp }