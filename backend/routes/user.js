const { Router } = require("express");
const { handleSignUp } = require("../controllers/userControllers");

const router = Router();

router.post('/signup', handleSignUp);

module.exports = router;