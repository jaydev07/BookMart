const express = require("express");
const {check} = require("express-validator");
const router = express.Router();

const authControllers = require("../controllers/auth");

router.post("/signup",
    [
        check('name').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({min:6})
    ] , authControllers.signup);

router.post("/signin",
    [
        check('email').isEmail(),
        check('password').isLength({min:6})
    ] , authControllers.signin);

router.get("/signout", authControllers.signout);

module.exports = router;