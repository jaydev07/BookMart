const express = require("express");
const {check} = require("express-validator");
const router = express.Router();

const userControllers = require("../controllers/user");
const checkAuth = require("../middlewares/auth-check");

// * new :- If any route contain userId then it will find the user by it's Id and send in the request to other routes
// It is a middleware
router.param("userId",userControllers.userById);

router.use(checkAuth.checkToken);

router.get("/secret/:userId", checkAuth.isAuth, (req,res) => {
    res.json({user:req.profile});
})

module.exports = router;