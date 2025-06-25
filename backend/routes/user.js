const { Router } = require("express");
const { handleSignUp, handleSignIn } = require("../controllers/userControllers");

const router = Router();

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);

module.exports = router;