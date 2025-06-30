const { Router } = require("express");
const { handleSignUp, handleSignIn, handleAddCategory, handleAddInvestment, handleDeleteCategory, handleGetInvestments, handleDeleteInvestment } = require("../controllers/userControllers");

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.patch('/addCategory', handleAddCategory);
router.post('/addInvestment', handleAddInvestment);
router.delete('/deleteCategory', handleDeleteCategory);
router.get('/getInvestments', handleGetInvestments);
router.delete('/deleteInvestment', handleDeleteInvestment);

module.exports = router;