const express = require("express");
const bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

//app.use(express.static(process.cwd() + "public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//routes
require("./routes/html-routes.js")(app);


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});