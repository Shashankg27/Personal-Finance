const { Router } = require("express");
const { handleSignUp, handleSignIn, handleAddCategory, handleAddInvestment, handleDeleteCategory, handleGetInvestments, handleDeleteInvestment, handleAddTransaction, handleDeleteTransaction, handleGetTransactions } = require("../controllers/userControllers");

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

module.exports = router;