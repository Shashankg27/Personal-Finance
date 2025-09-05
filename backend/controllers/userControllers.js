const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createToken, validateToken } = require("../services/authentication");
const Investments = require("../models/Investment");
const transactions = require("../models/Transaction");
const goals = require("../models/Goal");
const loans = require("../models/Loan");
const SECRET = process.env.JWT_SECRET;
const PDFDocument = require('pdfkit');

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

const handleDeleteGoal = async (req, res) => {
  const { goal } = req.body;
  // console.log(goal._id);
  try{
    await goals.findByIdAndDelete(goal._id);
    return res.status(200).json({ success: "Goal deleted successfully" });
  }
  catch(err){
    return res.status(404).json({ message: err });
  }
}

const handleAddLoan = async (req, res) => {
  const { loanData } = req.body;
  // console.log(loanData);
  try {
    await loans.create({
      ...loanData,
    });
    res.status(201).json({ success: "Loan created successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
const handleGetLoans = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = validateToken(token);

    const userLoans = await loans.find({ userId: user._id });

    return res
      .status(200)
      .json({ success: "Loans fetched successfully", userLoans });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err });
  }
};

const handleDeleteLoan = async (req, res) => {
  const { loan } = req.body;
  // console.log(goal._id);
  try{
    await loans.findByIdAndDelete(loan._id);
    return res.status(200).json({ success: "Loan deleted successfully" });
  }
  catch(err){
    return res.status(404).json({ message: err });
  }
}

async function handleGenerateReport(req, res) {
  try {
    let user = req.user;
    if (!user && req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      try {
        const bearerToken = req.headers.authorization.split(' ')[1];
        user = validateToken(bearerToken);
      } catch (e) {
        return res.status(401).json({ message: 'Invalid auth token' });
      }
    }
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const [userTransactions, userInvestments, userLoans, userGoals, userDoc] = await Promise.all([
      transactions.find({ userId: user._id }).lean(),
      Investments.find({ userId: user._id }).lean(),
      loans.find({ userId: user._id }).lean(),
      goals.find({ userId: user._id }).lean(),
      User.findById(user._id).lean()
    ]);

    const doc = new PDFDocument({ margin: 40, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="finance-report.pdf"');

    doc.pipe(res);

    const section = (title) => {
      doc.moveDown().fontSize(16).fillColor('#111827').text(title, { underline: true });
      doc.moveDown(0.5);
    };

    const tableRow = (cols) => {
      const colWidths = cols.map(() => Math.floor((doc.page.width - doc.page.margins.left - doc.page.margins.right) / cols.length));
      let x = doc.x;
      const y = doc.y;
      cols.forEach((text, idx) => {
        doc.fontSize(10).fillColor('#111827').text(String(text ?? ''), x, y, { width: colWidths[idx], continued: false });
        x += colWidths[idx];
      });
      doc.moveDown(0.4);
    };

    // Title
    doc.fontSize(20).fillColor('#111827').text('Personal Finance Report', { align: 'center' });
    doc.moveDown(0.25);
    doc.fontSize(10).fillColor('#374151').text(`Generated for: ${userDoc?.name || user.username} • ${new Date().toLocaleString()}`, { align: 'center' });

    // Categories
    section('Categories');
    tableRow(['Income Categories', 'Expense Categories', 'Investment Categories']);
    const maxLen = Math.max(userDoc?.incomeCategories?.length || 0, userDoc?.expenseCategories?.length || 0, userDoc?.investmentCategories?.length || 0);
    for (let i = 0; i < maxLen; i++) {
      tableRow([
        userDoc?.incomeCategories?.[i]?.name || '',
        userDoc?.expenseCategories?.[i]?.name || '',
        userDoc?.investmentCategories?.[i]?.name || ''
      ]);
    }

    // Transactions
    section('Transactions');
    tableRow(['Date', 'Name', 'Type', 'Category', 'Amount']);
    userTransactions.forEach((t) => {
      tableRow([
        new Date(t.date).toLocaleDateString(),
        t.name,
        t.type,
        t.category,
        (t.amount ?? 0).toFixed(2)
      ]);
    });

    // Investments
    section('Investments');
    tableRow(['Date', 'Name', 'Category', 'Principal', 'ROI', 'Note']);
    userInvestments.forEach((inv) => {
      tableRow([
        new Date(inv.date).toLocaleDateString(),
        inv.name,
        inv.category || '',
        (inv.principal ?? 0).toFixed(2),
        (inv.ROI ?? 0) + '%',
        inv.note || ''
      ]);
    });

    // Loans
    section('Loans');
    tableRow(['Start Date', 'Name', 'From', 'Principal', 'ROI', 'Tenure (mo)', 'Complete']);
    userLoans.forEach((ln) => {
      tableRow([
        new Date(ln.startDate).toLocaleDateString(),
        ln.name,
        ln.from,
        (ln.principal ?? 0).toFixed(2),
        (ln.ROI ?? 0) + '%',
        ln.timePeriod,
        ln.complete ? 'Yes' : 'No'
      ]);
    });

    // Goals
    section('Goals');
    tableRow(['Created', 'Target Date', 'Name', 'Amount', 'Complete']);
    userGoals.forEach((g) => {
      tableRow([
        new Date(g.creationDate).toLocaleDateString(),
        new Date(g.targetDate).toLocaleDateString(),
        g.name,
        (g.amount ?? 0).toFixed(2),
        g.complete ? 'Yes' : 'No'
      ]);
    });

    doc.end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to generate report', error: err.message });
  }
}

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
  handleDeleteGoal,
  handleDeleteLoan,
  handleAddLoan,
  handleGetLoans,
  handleGenerateReport
};
