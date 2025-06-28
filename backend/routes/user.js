const { Router } = require("express");
const { handleSignUp, handleSignIn, handleAddCategory, handleAddInvestment } = require("../controllers/userControllers");

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.patch('/addCategory', handleAddCategory);
router.post('/addInvestment', handleAddInvestment);

module.exports = router;