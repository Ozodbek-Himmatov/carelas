import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// const http = require("http");
// // const fs = require("fs");
// // const { fileReader } = require("./helper/fileReader.js");
// const pug = require("pug");

// http.createServer((req, res) => {
//     if (req.method == "GET") {
//         console.log(req.url);
//         if (req.url == "/") {
//             const compiledFunction = pug.compileFile("./views/index.pug");
//             res.end(
//                 compiledFunction({
//                     name: "OzodJS",
//                 })
//             );
//         }
//     }
// }).listen(PORT, (err) => {
//     if (err) {
//         console.log(err.name);
//     } else {
//         console.log(`Server working on ${PORT}`);
//     }
// });
