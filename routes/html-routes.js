// Requiring path to so we can use relative routes to our files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
     return res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("login");
  });

  app.get("/generator", function (req, res) {
    res.render("generator");
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    db.Pw.findAll({}).then(function (data) {
      var hbsObject = {
        pws: data.map(item=>item.toJSON()),
      };
      console.log(JSON.stringify(hbsObject));
      res.render("members", hbsObject);
    });
  });
};
