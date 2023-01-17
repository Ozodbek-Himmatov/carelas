// All imports
import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import flash from "connect-flash";
import session from "express-session";
import varMiddleware from "./middleware/var.js";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

// Routes
import AuthRoutes from "./routes/auth.js";
import ActionsRoutes from "./routes/actions.js";

dotenv.config();
// const variables
const app = express();
const hbs = create({ defaultLayout: "main", extname: "hbs" });
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
app.use( varMiddleware );

app.use(AuthRoutes);
app.use(ActionsRoutes);

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
