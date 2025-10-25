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
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
    // --- Auth: cookie or Bearer ---
    const cookieToken = req.cookies?.token;
    let user = cookieToken ? validateToken(cookieToken) : null;
    if (!user && req.headers?.authorization?.startsWith("Bearer ")) {
      const bearerToken = req.headers.authorization.split(" ")[1];
      const tokenUser = validateToken(bearerToken);
      user = await User.findById(tokenUser._id).lean();
    }
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    // --- Get query parameters for filtering ---
    const { reportType = 'summary', timePeriod = 'current-month', fromDate, toDate } = req.query;
    
    // --- Calculate date range based on timePeriod ---
    let startDate, endDate;
    const now = new Date();
    
    switch (timePeriod) {
      case 'current-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'last-month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'last-3-months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        endDate = now;
        break;
      case 'this-year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = now;
        break;
      case 'full-account':
        startDate = new Date('2020-01-01');
        endDate = now;
        break;
      case 'custom':
        startDate = fromDate ? new Date(fromDate) : new Date(now.getFullYear(), 0, 1);
        endDate = toDate ? new Date(toDate) : now;
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    // --- Fetch data with date filtering ---
    const [userTransactions, userInvestments, userLoans, userGoals] =
      await Promise.all([
        transactions.find({ 
          userId: user._id,
          date: { $gte: startDate, $lte: endDate }
        }).lean(),
        Investments.find({ 
          userId: user._id,
          date: { $gte: startDate, $lte: endDate }
        }).lean(),
        loans.find({ 
          userId: user._id,
          startDate: { $gte: startDate, $lte: endDate }
        }).lean(),
        goals.find({ 
          userId: user._id,
          creationDate: { $gte: startDate, $lte: endDate }
        }).lean(),
      ]);

    console.log('PDF Data fetched:', {
      transactions: userTransactions.length,
      investments: userInvestments.length,
      loans: userLoans.length,
      goals: userGoals.length,
      dateRange: { startDate, endDate }
    });

    // Debug: Check ALL transactions in database (not just filtered by date)
    const allTransactions = await transactions.find({ userId: user._id }).lean();
    console.log('=== COMPLETE DATABASE ANALYSIS ===');
    console.log('Total transactions in database:', allTransactions.length);
    
    if (allTransactions.length > 0) {
      const allTransactionTypes = allTransactions.map(t => t.type);
      const uniqueTypes = [...new Set(allTransactionTypes)];
      console.log('All transaction types in database:', uniqueTypes);
      
      // Show count for each type
      uniqueTypes.forEach(type => {
        const count = allTransactions.filter(t => t.type === type).length;
        console.log(`- ${type}: ${count} transactions`);
      });
      
      // Show sample of each type
      uniqueTypes.forEach(type => {
        const samples = allTransactions.filter(t => t.type === type).slice(0, 2);
        console.log(`Sample ${type} transactions:`, samples.map(t => ({ name: t.name, type: t.type, amount: t.amount, date: t.date })));
      });
    }
    console.log('=== END DATABASE ANALYSIS ===');

    // --- PDF init (buffer pages so we can add page numbers) ---
    const doc = new PDFDocument({ margin: 40, size: "A4", bufferPages: true });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="finance-report.pdf"');
    doc.pipe(res);

    // --- Layout config ---
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = doc.page.margins.left;
    const usableWidth = pageWidth - margin * 2;
    const footerHeight = 28;
    const usableHeight = pageHeight - margin * 2 - footerHeight;
    const cellPadding = 6;
    const lineGap = 4;

    // --- Helpers ---
    const safe = (v) => {
      if (v === null || v === undefined) return "";
      if (typeof v === "number" && !Number.isFinite(v)) return "";
      return String(v);
    };

    const ensureSpaceFor = (heightNeeded) => {
      if (doc.y + heightNeeded > margin + usableHeight) {
        doc.addPage();
        doc.y = margin;
        doc.x = margin;
      }
    };

    // vertical-center-aware draw for a single table (headers + rows)
    function drawTable(headers, rows, colFractions, opts = {}) {
      const colWidths = colFractions.map((f) => f * usableWidth);
      const allRows = [headers, ...rows];

      for (let r = 0; r < allRows.length; r++) {
        const row = allRows[r];
        // compute per-cell heights
        const cellHeights = row.map((cell, i) => {
          const w = Math.max(20, Math.floor(colWidths[i] - 2 * cellPadding));
          return Math.max(doc.heightOfString(safe(cell), { width: w }), 10);
        });
        const rowHeight = Math.max(...cellHeights) + 2 * cellPadding;

        ensureSpaceFor(rowHeight + 4);

        const xStart = margin;
        let x = xStart;
        const y = doc.y;

        // header background
        if (r === 0) {
          doc.save();
          doc.rect(xStart, y, usableWidth, rowHeight).fill("#f3f4f6");
          doc.restore();
        }

        // draw each cell content with vertical centering
        for (let c = 0; c < row.length; c++) {
          const w = colWidths[c];
          const text = safe(row[c]);
          const textWidth = Math.max(10, Math.floor(w - 2 * cellPadding));
          const textHeight = doc.heightOfString(text, { width: textWidth });
          const textY = y + cellPadding + Math.max(0, (rowHeight - 2 * cellPadding - textHeight) / 2);

          // choose font
          if (r === 0) {
            doc.font("Helvetica-Bold").fontSize(10).fillColor("#111827");
          } else {
            doc.font("Helvetica").fontSize(9).fillColor("#111827");
          }

          doc.text(text, x + cellPadding, textY, { width: textWidth, lineGap: 2 });

          // optional vertical separator: uncomment if you want vertical lines
          // doc.save(); doc.moveTo(x + w, y).lineTo(x + w, y + rowHeight).lineWidth(0.4).stroke("#E5E7EB"); doc.restore();

          x += w;
        }

        // bottom separator line
        doc.save();
        doc.moveTo(xStart, y + rowHeight - 2).lineTo(xStart + usableWidth, y + rowHeight - 2)
          .lineWidth(0.4).strokeColor("#E5E7EB").stroke();
        doc.restore();

        // advance y
        doc.y = y + rowHeight + 4;
        doc.x = margin;
      }
    }

    // --- Filter data based on report type ---
    let filteredTransactions = userTransactions;
    let filteredInvestments = userInvestments;
    let filteredLoans = userLoans;
    let filteredGoals = userGoals;

    console.log('Before filtering - reportType:', reportType);
    console.log('Before filtering - transactions count:', userTransactions.length);

    if (reportType !== 'summary') {
      switch (reportType) {
        case 'income':
          filteredTransactions = userTransactions.filter(t => 
            t.type === 'income' || 
            t.type === 'Income' || 
            t.type === 'INCOME' ||
            t.type.toLowerCase() === 'income'
          );
          filteredInvestments = [];
          filteredLoans = [];
          filteredGoals = [];
          console.log('Income filtering - filtered transactions count:', filteredTransactions.length);
          break;
        case 'expenses':
          filteredTransactions = userTransactions.filter(t => 
            t.type === 'expense' || 
            t.type === 'Expense' || 
            t.type === 'EXPENSE' ||
            t.type.toLowerCase() === 'expense'
          );
          filteredInvestments = [];
          filteredLoans = [];
          filteredGoals = [];
          console.log('Expense filtering - filtered transactions count:', filteredTransactions.length);
          break;
        case 'investments':
          filteredTransactions = [];
          filteredLoans = [];
          filteredGoals = [];
          break;
        case 'goals':
          filteredTransactions = [];
          filteredInvestments = [];
          filteredLoans = [];
          break;
      }
    } else {
      console.log('Summary report - showing all transactions:', filteredTransactions.length);
    }

    // --- Header / Title ---
    const reportTitle = reportType === 'summary' ? 'Personal Finance Report' : 
                       reportType === 'income' ? 'Income Report' :
                       reportType === 'expenses' ? 'Expenses Report' :
                       reportType === 'investments' ? 'Investments Report' :
                       reportType === 'goals' ? 'Goals Report' : 'Personal Finance Report';
    
    doc.font("Helvetica-Bold").fontSize(20).fillColor("#111827").text(reportTitle, { align: "center" });
    doc.moveDown(0.2);
    
    const dateRangeText = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    doc.font("Helvetica").fontSize(10).fillColor("#374151")
      .text(`Generated for: ${safe(user.name || user.username)} • Period: ${dateRangeText} • ${new Date().toLocaleString()}`, { align: "center" });
    doc.moveDown(0.6);

    // --- Categories ---
    if ((user?.incomeCategories?.length || 0) || (user?.expenseCategories?.length || 0) || (user?.investmentCategories?.length || 0)) {
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#111827").text("Categories");
      doc.moveDown(0.2);

      const income = (user.incomeCategories || []).map((c) => c.name);
      const expense = (user.expenseCategories || []).map((c) => c.name);
      const invest = (user.investmentCategories || []).map((c) => c.name);
      const maxLen = Math.max(income.length, expense.length, invest.length);

      const rows = [];
      for (let i = 0; i < maxLen; i++) {
        rows.push([income[i] || "", expense[i] || "", invest[i] || ""]);
      }

      const headers = ["Income Categories", "Expense Categories", "Investment Categories"];
      const cols = [1 / 3, 1 / 3, 1 / 3];
      drawTable(headers, rows, cols);
      doc.moveDown(0.4);
    }

    // --- Transactions ---
    if ((filteredTransactions || []).length > 0) {
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#111827").text("Transactions");
      doc.moveDown(0.2);

      const headers = ["Date", "Name", "Type", "Category", "Amount"];
      const cols = [0.16, 0.36, 0.12, 0.24, 0.12];
      const rows = filteredTransactions.map((t) => [
        t.date ? new Date(t.date).toLocaleDateString() : "",
        t.name || "",
        t.type || "",
        t.category || "",
        Number.isFinite(Number(t.amount)) ? Number(t.amount).toFixed(2) : "0.00",
      ]);
      drawTable(headers, rows, cols);
      doc.moveDown(0.4);
    }

    // --- Investments ---
    if ((filteredInvestments || []).length > 0) {
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#111827").text("Investments");
      doc.moveDown(0.2);

      const headers = ["Date", "Name", "Category", "Principal", "ROI", "Note"];
      const cols = [0.14, 0.28, 0.18, 0.14, 0.12, 0.14];
      const rows = filteredInvestments.map((inv) => [
        inv.date ? new Date(inv.date).toLocaleDateString() : "",
        inv.name || "",
        inv.category || "",
        Number.isFinite(Number(inv.principal)) ? Number(inv.principal).toFixed(2) : "0.00",
        Number.isFinite(Number(inv.ROI ?? inv.roi)) ? `${Number(inv.ROI ?? inv.roi)}%` : "0%",
        inv.note || "",
      ]);
      drawTable(headers, rows, cols);
      doc.moveDown(0.4);
    }

    // --- Loans ---
    if ((filteredLoans || []).length > 0) {
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#111827").text("Loans");
      doc.moveDown(0.2);

      const headers = ["Start Date", "Name", "From", "Principal", "ROI", "Tenure (mo)", "Complete"];
      const cols = [0.14, 0.22, 0.16, 0.14, 0.12, 0.12, 0.10];
      const rows = filteredLoans.map((ln) => [
        ln.startDate ? new Date(ln.startDate).toLocaleDateString() : "",
        ln.name || "",
        ln.from || "",
        Number.isFinite(Number(ln.principal)) ? Number(ln.principal).toFixed(2) : "0.00",
        Number.isFinite(Number(ln.ROI ?? ln.roi)) ? `${Number(ln.ROI ?? ln.roi)}%` : "0%",
        safe(ln.timePeriod),
        ln.complete ? "Yes" : "No",
      ]);
      drawTable(headers, rows, cols);
      doc.moveDown(0.4);
    }

    // --- Goals ---
    if ((filteredGoals || []).length > 0) {
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#111827").text("Goals");
      doc.moveDown(0.2);

      const headers = ["Created", "Target Date", "Name", "Amount", "Complete"];
      const cols = [0.18, 0.20, 0.34, 0.14, 0.14];
      const rows = filteredGoals.map((g) => [
        g.creationDate ? new Date(g.creationDate).toLocaleDateString() : "",
        g.targetDate ? new Date(g.targetDate).toLocaleDateString() : "",
        g.name || "",
        Number.isFinite(Number(g.amount)) ? Number(g.amount).toFixed(2) : "0.00",
        g.complete ? "Yes" : "No",
      ]);
      drawTable(headers, rows, cols);
      doc.moveDown(0.4);
    }

    // --- Page numbers: "Page X of Y" on each page ---
    const range = doc.bufferedPageRange(); // { start: 0, count: N }
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i);
      const text = `Page ${i + 1} of ${range.count}`;
      doc.font("Helvetica").fontSize(9).fillColor("#6b7280")
        .text(text, margin, pageHeight - margin - 12, { width: usableWidth, align: "right" });
    }

    // finalize
    doc.end();
  } catch (err) {
    console.error("❌ Report generation error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to generate report", error: err.message });
    }
  }
};

// Generate CSV report
const handleGenerateCsvReport = async (req, res) => {
  try {
    // --- Auth: cookie or Bearer ---
    const cookieToken = req.cookies?.token;
    let user = cookieToken ? validateToken(cookieToken) : null;
    if (!user && req.headers?.authorization?.startsWith("Bearer ")) {
      const bearerToken = req.headers.authorization.split(" ")[1];
      const tokenUser = validateToken(bearerToken);
      user = await User.findById(tokenUser._id).lean();
    }
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    // --- Get query parameters for filtering ---
    const { reportType = 'summary', timePeriod = 'current-month', fromDate, toDate } = req.query;
    
    // --- Calculate date range based on timePeriod ---
    let startDate, endDate;
    const now = new Date();
    
    switch (timePeriod) {
      case 'current-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'last-month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'last-3-months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        endDate = now;
        break;
      case 'this-year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = now;
        break;
      case 'full-account':
        startDate = new Date('2020-01-01');
        endDate = now;
        break;
      case 'custom':
        startDate = fromDate ? new Date(fromDate) : new Date(now.getFullYear(), 0, 1);
        endDate = toDate ? new Date(toDate) : now;
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    // --- Fetch data with date filtering ---
    const [userTransactions, userInvestments, userLoans, userGoals] = await Promise.all([
      transactions.find({ 
        userId: user._id,
        date: { $gte: startDate, $lte: endDate }
      }).lean(),
      Investments.find({ 
        userId: user._id,
        date: { $gte: startDate, $lte: endDate }
      }).lean(),
      loans.find({ 
        userId: user._id,
        startDate: { $gte: startDate, $lte: endDate }
      }).lean(),
      goals.find({ 
        userId: user._id,
        creationDate: { $gte: startDate, $lte: endDate }
      }).lean(),
    ]);

    console.log('CSV Data fetched:', {
      transactions: userTransactions.length,
      investments: userInvestments.length,
      loans: userLoans.length,
      goals: userGoals.length,
      dateRange: { startDate, endDate }
    });

    // Debug: Check transaction types
    if (userTransactions.length > 0) {
      const transactionTypes = userTransactions.map(t => t.type);
      const uniqueTypes = [...new Set(transactionTypes)];
      console.log('CSV Transaction types found:', uniqueTypes);
      console.log('CSV Sample transactions:', userTransactions.slice(0, 3).map(t => ({ name: t.name, type: t.type, amount: t.amount })));
    }

    // --- Prepare CSV data based on report type ---
    let csvData = [];
    let filename = '';

    switch (reportType) {
      case 'income':
        csvData = userTransactions.filter(t => 
          t.type === 'income' || 
          t.type === 'Income' || 
          t.type === 'INCOME' ||
          t.type.toLowerCase() === 'income'
        ).map(t => ({
          Date: t.date ? new Date(t.date).toLocaleDateString() : '',
          Name: t.name || '',
          Category: t.category || '',
          Amount: Number(t.amount || 0).toFixed(2),
          Description: t.description || ''
        }));
        filename = 'income-report.csv';
        break;
        
      case 'expenses':
        csvData = userTransactions.filter(t => 
          t.type === 'expense' || 
          t.type === 'Expense' || 
          t.type === 'EXPENSE' ||
          t.type.toLowerCase() === 'expense'
        ).map(t => ({
          Date: t.date ? new Date(t.date).toLocaleDateString() : '',
          Name: t.name || '',
          Category: t.category || '',
          Amount: Number(t.amount || 0).toFixed(2),
          Description: t.description || ''
        }));
        filename = 'expenses-report.csv';
        break;
        
      case 'investments':
        csvData = userInvestments.map(inv => ({
          Date: inv.date ? new Date(inv.date).toLocaleDateString() : '',
          Name: inv.name || '',
          Category: inv.category || '',
          Principal: Number(inv.principal || 0).toFixed(2),
          ROI: `${Number(inv.ROI || inv.roi || 0)}%`,
          Note: inv.note || ''
        }));
        filename = 'investments-report.csv';
        break;
        
      case 'goals':
        csvData = userGoals.map(g => ({
          Created: g.creationDate ? new Date(g.creationDate).toLocaleDateString() : '',
          TargetDate: g.targetDate ? new Date(g.targetDate).toLocaleDateString() : '',
          Name: g.name || '',
          Amount: Number(g.amount || 0).toFixed(2),
          Complete: g.complete ? 'Yes' : 'No'
        }));
        filename = 'goals-report.csv';
        break;
        
      default: // summary
        // Combine all data into a comprehensive report
        const allTransactions = userTransactions.map(t => ({
          Type: 'Transaction',
          SubType: t.type,
          Date: t.date ? new Date(t.date).toLocaleDateString() : '',
          Name: t.name || '',
          Category: t.category || '',
          Amount: Number(t.amount || 0).toFixed(2),
          Description: t.description || ''
        }));
        
        const allInvestments = userInvestments.map(inv => ({
          Type: 'Investment',
          SubType: 'Investment',
          Date: inv.date ? new Date(inv.date).toLocaleDateString() : '',
          Name: inv.name || '',
          Category: inv.category || '',
          Amount: Number(inv.principal || 0).toFixed(2),
          Description: `ROI: ${Number(inv.ROI || inv.roi || 0)}% - ${inv.note || ''}`
        }));
        
        const allLoans = userLoans.map(ln => ({
          Type: 'Loan',
          SubType: 'Loan',
          Date: ln.startDate ? new Date(ln.startDate).toLocaleDateString() : '',
          Name: ln.name || '',
          Category: ln.from || '',
          Amount: Number(ln.principal || 0).toFixed(2),
          Description: `ROI: ${Number(ln.ROI || ln.roi || 0)}% - Tenure: ${ln.timePeriod} months`
        }));
        
        const allGoals = userGoals.map(g => ({
          Type: 'Goal',
          SubType: 'Goal',
          Date: g.creationDate ? new Date(g.creationDate).toLocaleDateString() : '',
          Name: g.name || '',
          Category: 'Goal',
          Amount: Number(g.amount || 0).toFixed(2),
          Description: `Target: ${g.targetDate ? new Date(g.targetDate).toLocaleDateString() : ''} - ${g.complete ? 'Complete' : 'In Progress'}`
        }));
        
        csvData = [...allTransactions, ...allInvestments, ...allLoans, ...allGoals];
        filename = 'finance-summary-report.csv';
    }

    // --- Set response headers ---
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // --- Generate CSV content ---
    if (csvData.length === 0) {
      return res.send('No data found for the selected period and filters.');
    }

    // Get headers from first object
    const headers = Object.keys(csvData[0]);
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    csvData.forEach(row => {
      const values = headers.map(header => {
        const value = row[header] || '';
        // Escape commas and quotes in CSV
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvContent += values.join(',') + '\n';
    });

    res.send(csvContent);
  } catch (err) {
    console.error("❌ CSV Report generation error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to generate CSV report", error: err.message });
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
  handleGenerateCsvReport,
  handleUpdateUser
};
