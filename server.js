const express = require("express");
const bodyParser = require("body-parser");
const admin = require('firebase-admin');


const dotenv = require("dotenv");
dotenv.config();

var app = express();
var PORT = process.env.PORT || 3000;

var serviceAccount =
{
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key.replace(/\\n/g, '\n'),
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider,
    "client_x509_cert_url": process.env.client
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cannabisstand-dfdcb-default-rtdb.firebaseio.com"
});

const database = admin.database();

//app.use(express.static(process.cwd() + "public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//routes
require("./routes/html-routes.js")(app);


app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});