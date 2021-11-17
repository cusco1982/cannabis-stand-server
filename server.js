const express = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

var app = express();
var PORT = process.env.PORT || 3000;

//app.use(express.static(process.cwd() + "public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// console.log("here");
console.log(process.env.API_KEY);

//routes
require("./routes/html-routes.js")(app);


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});