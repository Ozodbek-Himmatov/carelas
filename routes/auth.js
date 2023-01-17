import Router from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../services/token.js";
const router = Router();

router.get("/login", (req, res) => {
    if (req.cookies.token) {
        res.redirect("/");
        return;
    }
    res.render("login", {
        title: "Log in - Carelas.js",
        isLoginActive: true,
        loginError: req.flash("loginError"),
    });
});


router.get("/signup", (req, res) => {
    if (req.cookies.token) {
        res.redirect("/");
        return;
    }
    res.render("signup", {
        title: "Sign up - Carelas.js",
        isSignupActive: true,
        signupError: req.flash("signupError"),
    });
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
} );

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash("loginError", "All fields required");
        res.redirect("/login");
        return;
    }

    const existentUser = await User.findOne({ email });
    if (!existentUser) {
        req.flash("loginError", "User NOT Found!");
        res.redirect("/login");
        return;
    }

    const isPswrdEqual = await bcrypt.compare(password, existentUser.password);

    if (!isPswrdEqual) {
        req.flash("loginError", "WRONG Password");
        res.redirect("/login");
        return;
    }

    const token = generateJwtToken(existentUser._id);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.redirect("/");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        req.flash("signupError", "All fields required");
        res.redirect("/signup");
        return;
    }

    const candidate = await User.findOne({ email });

    if (candidate) {
        req.flash("signupError", "User already EXISTS");
        res.redirect("/signup");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
    };
    const user = await User.create(userData);
    const token = generateJwtToken(user._id);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.redirect("/");
});

export default router;
