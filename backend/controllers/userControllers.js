const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createToken, validateToken } = require("../services/authentication");
const Investments = require("../models/Investment");
const transactions = require("../models/Transaction");
const goals = require("../models/Goal");
const SECRET = process.env.JWT_SECRET;

const handleSignUp = async (req, res) => {
  console.log(req.body);

  try {
    await User.create({
      name: req.body.fname + " " + req.body.lname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    return res.status(201).json({ success: "Signup Successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await User.checkPasswordAndCreateToken(username, password);
    return res
      .cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .json({ success: "Signin Successful" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
};

const handleAddInvestment = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = validateToken(token);
    console.log(req.body);
    const { investmentData } = req.body;
    await Investments.create({
      name: investmentData.name,
      note: investmentData.note,
      date: investmentData?.date,
      principal: investmentData.principal,
      ROI: investmentData.roi,
      category: investmentData.category,
      userId: user._id,
    });

    return res.status(201).json({ success: "Investment created Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleDeleteInvestment = async (req, res) => {
  try {
    await Investments.findOneAndDelete({
      name: req.body.investment.name,
      userId: req.body.investment.userId,
    });

    return res.status(201).json({ success: "Investment deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleAddCategory = async (req, res) => {
  const { categoryData } = req.body;

  try {
    const prevToken = req.cookies.token;
    console.log(req.cookies);
    const prevUser = validateToken(prevToken);
    const type = categoryData.type;
    const user = await User.findOne({ _id: prevUser._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const categoryExists = user[type].some(
      (cat) => cat.name.toLowerCase() === categoryData.name.toLowerCase()
    );
    if (categoryExists) {
      return res
        .status(409)
        .json({ success: false, message: "Category already exists" });
    }

    user[type].push(categoryData);
    await user.save();

    const token = createToken(user);

    console.log(token);
    console.log(validateToken(token));

    return res
      .cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .json({ success: true, message: "Category added successfully" });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const handleDeleteCategory = async (req, res) => {
  const { name, type } = req.body.category;

  try {
    const prevToken = req.cookies.token;
    console.log(req.cookies);
    const prevUser = validateToken(prevToken);
    const user = await User.findOne({ _id: prevUser._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const categoryIndex = user[type].findIndex(
      (cat) => cat.name.toLowerCase() === req.body.category.name.toLowerCase()
    );
    console.log(user[type]);
    console.log(req.body.category);
    console.log(categoryIndex);
    if (categoryIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found!" });
    }
    user[type].splice(categoryIndex, 1);

    await user.save();

    const token = createToken(user);

    console.log(token);
    console.log(validateToken(token));

    return res
      .cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .json({ success: true, message: "Category removed successfully" });
  } catch (error) {
    console.error("Error removing category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const handleGetInvestments = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = validateToken(token);

    const investments = await Investments.find({ userId: user._id });

    return res
      .status(200)
      .json({ success: "Investments fetched success", investments });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const handleAddTransaction = async (req, res) => {
  const { transactionData } = req.body;
  console.log(transactionData);
  try {
    await transactions.create({
      ...transactionData,
    });

    return res.status(201).json({ success: "Transaction added successfully" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const handleDeleteTransaction = async (req, res) => {
  const { id } = req.body;

  try {
    await transactions.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: "Transaction deleted successfully" });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

const handleGetTransactions = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = validateToken(token);

    const userTransactions = await transactions.find({ userId: user._id });

    return res
      .status(201)
      .json({ success: "Transactions fetched successfully", userTransactions });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};
const handleAddGoal = async (req, res) => {
  const { goalData } = req.body;
  try {
    await goals.create({
      ...goalData,
    });
    res.status(201).json({ success: "Goal created successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
const handleGetGoals = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = validateToken(token);

    const userGoals = await goals.find({ userId: user._id });

    return res
      .status(200)
      .json({ success: "Goals fetched successfully", userGoals });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};
module.exports = {
  handleSignUp,
  handleSignIn,
  handleAddCategory,
  handleAddInvestment,
  handleDeleteCategory,
  handleGetInvestments,
  handleDeleteInvestment,
  handleAddTransaction,
  handleDeleteTransaction,
  handleGetTransactions,
  handleAddGoal,
  handleGetGoals,
};
