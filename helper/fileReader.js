const fs = require("fs");
const path = require("path");
const pug = require("pug");

const fileReader = (page, data) => {
    const compiledFunction = pug.compileFile(`./views/${page}.pug`);
    return compiledFunction(data);
};
module.exports = { fileReader };
