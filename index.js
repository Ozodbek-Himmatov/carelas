// installed libraries
import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import moment from "moment";

// MIDDLEWARE
import varMiddleware from "./middleware/var.js";
import AuthMiddleware from "./middleware/auth.js";
import UserMiddleware from "./middleware/user.js";

// Routes
import AuthRoutes from "./routes/auth.js";
import ActionsRoutes from "./routes/actions.js";

dotenv.config();
// const variables
const app = express();
const hbs = create({
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
        formatDate: function (date) {
            return moment(date).fromNow();
        },
        isEqual: function (a, b, options) {
            return a.toString() == b.toString()
                ? options.fn(this)
                : options.inverse(this);
        },
    },
});
// body
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "Taqvo", resave: false, saveUninitialized: false }));
app.use(flash());

app.use(UserMiddleware);
app.use(varMiddleware);

app.use(AuthRoutes);
app.use(ActionsRoutes);

app.use(AuthMiddleware);

const startApp = () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () =>
            console.log("Mongo DB is connected")
        );

        const PORT = 3000;
        app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};
startApp();
