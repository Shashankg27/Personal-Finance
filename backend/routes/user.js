const { Router } = require("express");
const { handleSignUp, handleSignIn, handleAddCategory, handleAddInvestment, handleDeleteCategory } = require("../controllers/userControllers");

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.patch('/addCategory', handleAddCategory);
router.post('/addInvestment', handleAddInvestment);
router.delete('/deleteCategory', handleDeleteCategory);

module.exports = router;