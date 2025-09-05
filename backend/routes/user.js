const { Router } = require("express");
const { handleSignUp, handleSignIn, handleAddCategory, handleAddInvestment, handleDeleteCategory, handleGetInvestments, handleDeleteInvestment, handleAddTransaction, handleDeleteTransaction, handleGetTransactions, handleAddGoal, handleGetGoals, handleDeleteGoal, handleAddLoan, handleGetLoans, handleDeleteLoan, handleGenerateReport } = require("../controllers/userControllers");
const { checkForAuthenticationCookie } = require('../middlewares/authentication');

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.patch('/addCategory', handleAddCategory);
router.post('/addInvestment', handleAddInvestment);
router.delete('/deleteCategory', handleDeleteCategory);
router.get('/getInvestments', handleGetInvestments);
router.delete('/deleteInvestment', handleDeleteInvestment);
router.post('/addTransaction', handleAddTransaction);
router.delete('/deleteTransaction', handleDeleteTransaction);
router.get('/getTransactions', handleGetTransactions);
router.post('/addGoal',handleAddGoal);
router.get('/getGoals',handleGetGoals);
router.delete('/deleteGoal',handleDeleteGoal);
router.post('/addLoan',handleAddLoan);
router.get('/getLoans',handleGetLoans);
router.delete('/deleteLoan',handleDeleteLoan);
router.get('/report', checkForAuthenticationCookie('token'), handleGenerateReport);

module.exports = router;