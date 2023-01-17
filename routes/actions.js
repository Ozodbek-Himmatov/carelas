import Router from "express";
const router = Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Carelas.js - Trade on Top",
    });
});

router.get("/trade", (req, res) => {
    res.render("trade", {
        title: "Carelas.js - On Sale!",
    });
});

router.get("/reviews", (req, res) => {
    res.render("reviews", {
        title: "Carelas.js - See Reviews",
    });
});

router.get("/news", (req, res) => {
    res.render("news", {
        title: "Explore News - Carelas.js",
    });
});

router.get("/terms-of-service", (req, res) => {
    res.render("terms-of-service", {
        title: "Our Terms!!! - Carelas.js",
    });
});

export default router;
