const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createToken, validateToken } = require("../services/authentication");
const Investments = require("../models/Investment");
const transactions = require("../models/Transaction");
const goals = require("../models/Goal");
const loans = require("../models/Loan");
const SECRET = process.env.JWT_SECRET;
const PDFDocument = require('pdfkit');
const bcrypt = require("bcrypt");

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

const handleUpdateUser = async (req, res) => {
  try {
    const { name, email, username, currentPassword, newPassword } = req.body;

    // ✅ Extract and verify token
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id); // ✅ Fetch user from DB
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Check password if updating
    if (newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // ✅ Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ error: "Server error" });
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

// Generate finance report
const handleGenerateReport = async (req, res) => {
  try {
    let user = null;

    // Case 1: middleware has already set req.user
    if (req.user) {
      user = await User.findById(req.user._id).lean();
    }

    // Case 2: fallback → extract from Bearer token
    if (
      !user &&
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      try {
        const bearerToken = req.headers.authorization.split(" ")[1];
        const tokenUser = validateToken(bearerToken);
        user = await User.findById(tokenUser._id).lean();
      } catch (e) {
        return res.status(401).json({ message: "Invalid auth token" });
      }
    }

    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Fetch all user data
    const [userTransactions, userInvestments, userLoans, userGoals] =
      await Promise.all([
        transactions.find({ userId: user._id }).lean(),
        Investments.find({ userId: user._id }).lean(),
        loans.find({ userId: user._id }).lean(),
        goals.find({ userId: user._id }).lean(),
      ]);

    // Create PDF
    const doc = new PDFDocument({ margin: 40, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="finance-report.pdf"'
    );

    doc.pipe(res);

    // Catch PDF errors
    doc.on("error", (err) => {
      console.error("PDF generation error:", err);
      if (!res.headersSent) {
        res
          .status(500)
          .json({ message: "Failed to generate report", error: err.message });
      }
    });

    // Helper functions
    const section = (title) => {
      doc.moveDown().fontSize(16).fillColor("#111827").text(title, {
        underline: true,
      });
      doc.moveDown(0.5);
    };

    const tableRow = (cols) => {
      if (!cols || cols.length === 0) return; // skip empty rows

      const usableWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;

      const colWidths = cols.map(() =>
        Math.floor(usableWidth / cols.length)
      );

      let x = doc.x;
      const y = doc.y;

      cols.forEach((text, idx) => {
        doc
          .fontSize(10)
          .fillColor("#111827")
          .text(String(text ?? ""), x, y, {
            width: colWidths[idx],
            continued: false,
          });
        x += colWidths[idx];
      });
      doc.moveDown(0.4);
    };

    // Title
    doc
      .fontSize(20)
      .fillColor("#111827")
      .text("Personal Finance Report", { align: "center" });
    doc.moveDown(0.25);
    doc
      .fontSize(10)
      .fillColor("#374151")
      .text(
        `Generated for: ${user?.name || user?.username} • ${new Date().toLocaleString()}`,
        { align: "center" }
      );

    // Categories
    if (
      user?.incomeCategories?.length ||
      user?.expenseCategories?.length ||
      user?.investmentCategories?.length
    ) {
      section("Categories");
      tableRow([
        "Income Categories",
        "Expense Categories",
        "Investment Categories",
      ]);

      const maxLen = Math.max(
        user?.incomeCategories?.length || 0,
        user?.expenseCategories?.length || 0,
        user?.investmentCategories?.length || 0
      );

      for (let i = 0; i < maxLen; i++) {
        tableRow([
          user?.incomeCategories?.[i]?.name || "",
          user?.expenseCategories?.[i]?.name || "",
          user?.investmentCategories?.[i]?.name || "",
        ]);
      }
    }

    // Transactions
    if (userTransactions?.length > 0) {
      section("Transactions");
      tableRow(["Date", "Name", "Type", "Category", "Amount"]);
      userTransactions.forEach((t) => {
        tableRow([
          t.date ? new Date(t.date).toLocaleDateString() : "",
          t.name || "",
          t.type || "",
          t.category || "",
          (t.amount ?? 0).toFixed(2),
        ]);
      });
    }

    // Investments
    if (userInvestments?.length > 0) {
      section("Investments");
      tableRow(["Date", "Name", "Category", "Principal", "ROI", "Note"]);
      userInvestments.forEach((inv) => {
        tableRow([
          inv.date ? new Date(inv.date).toLocaleDateString() : "",
          inv.name || "",
          inv.category || "",
          (inv.principal ?? 0).toFixed(2),
          (inv.ROI ?? 0) + "%",
          inv.note || "",
        ]);
      });
    }

    // Loans
    if (userLoans?.length > 0) {
      section("Loans");
      tableRow([
        "Start Date",
        "Name",
        "From",
        "Principal",
        "ROI",
        "Tenure (mo)",
        "Complete",
      ]);
      userLoans.forEach((ln) => {
        tableRow([
          ln.startDate ? new Date(ln.startDate).toLocaleDateString() : "",
          ln.name || "",
          ln.from || "",
          (ln.principal ?? 0).toFixed(2),
          (ln.ROI ?? 0) + "%",
          ln.timePeriod ?? "",
          ln.complete ? "Yes" : "No",
        ]);
      });
    }

    // Goals
    if (userGoals?.length > 0) {
      section("Goals");
      tableRow(["Created", "Target Date", "Name", "Amount", "Complete"]);
      userGoals.forEach((g) => {
        tableRow([
          g.creationDate ? new Date(g.creationDate).toLocaleDateString() : "",
          g.targetDate ? new Date(g.targetDate).toLocaleDateString() : "",
          g.name || "",
          (g.amount ?? 0).toFixed(2),
          g.complete ? "Yes" : "No",
        ]);
      });
    }

    doc.end();
  } catch (err) {
    console.error("Report generation error:", err);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "Failed to generate report", error: err.message });
    }
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
  handleDeleteGoal,
  handleDeleteLoan,
  handleAddLoan,
  handleGetLoans,
  handleGenerateReport,
  handleUpdateUser
};
