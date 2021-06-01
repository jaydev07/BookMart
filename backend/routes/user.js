const express = require("express");
const {check} = require("express-validator");
const router = express.Router();

const userControllers = require("../controllers/user");

router.post("/signup",
    [
        check('name').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({min:6})
    ] , userControllers.signup);

router.post("/signin",
    [
        check('email').isEmail(),
        check('password').isLength({min:6})
    ] , userControllers.signin);

router.get("/signout", userControllers.signout);

module.exports = router;