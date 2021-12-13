var path = require("path");


module.exports = function (app) {

  app.get("/", function (req, res) {
    // get firebase data and render
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });



};