import Router from "express";
const router = Router();
import AuthMiddleware from "../middleware/auth.js";
import Car from "../models/Car.js";

router.get("/", AuthMiddleware, (req, res) => {
    res.render("index", {
        title: "Carelas - Trade on Top",
    });
});

router.get("/trade", AuthMiddleware, async (req, res) => {
    let cars = await Car.find().populate("user").lean();
    res.render("trade", {
        currentUser: req.user,
        title: "Carelas - On Sale!",
        isTradeActive: true,
        cars,
    });
});

router.get("/reviews", AuthMiddleware, (req, res) => {
    res.render("reviews", {
        title: "Carelas - See Reviews",
        isReviewsActive: true,
    });
});

router.get("/news", AuthMiddleware, (req, res) => {
    res.render("news", {
        title: "Explore News - Carelas",
        isNewsActive: true,
    });
});

router.get("/terms-of-service", (req, res) => {
    res.render("terms-of-service", {
        title: "Our Terms!!! - Carelas",
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        title: "About Team - Carelas",
        isAboutActive: true,
    });
});

router.post("/add", async (req, res) => {
    let { name, image, model, description } = req.body;
    let car = await Car.create({
        image,
        model,
        description,
        user: req.user,
    });
    res.redirect("/trade");
});

router.post("/delete/:id", async (req, res) => {
    let car = await Car.findByIdAndDelete(req.params.id);
    res.redirect("/trade");
});

export default router;
