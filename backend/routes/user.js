const { Router } = require("express");
const { handleSignUp, handleSignIn, handleAddCategory } = require("../controllers/userControllers");

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);
router.patch('/addCategory', handleAddCategory);

module.exports = router;