const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/Auth");

router.get("/login", (req, res) => {
    res.render("Auth/login")
})

router.post("/login", passport.authenticate('local', {
    // failureFlash: true,
    failureRedirect: "/auth/login"
}), (req, res) => {
    // req.flash("success", `Welcome back ${req.user.username}!!`);
    res.redirect("/fantasy-match");
})

router.post("/cregister", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const newUser = await User.register(user, password);
        passport.authenticate('local')(req, res, () => {
            // req.flash("success", `Thanks for registration ${newUser.username}`);
            res.redirect("/fantasy-match");
        })
    } catch (e) {
        const errMssg = 'E11000 duplicate key error collection: Agile11.users index: email_1 dup key:'
        e.message = e.message.includes(errMssg) ? 'This email is already registered. Try to Sign Up with another mail' : e.message;
        req.flash("error", e.message);
        res.redirect("/auth/login");
    }
})

router.get("/signup", (req, res) => {
    res.render("Auth/signup")
})

module.exports = router;
