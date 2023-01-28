export default async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.redirect("/login");
        return;
    }
    next();
}
