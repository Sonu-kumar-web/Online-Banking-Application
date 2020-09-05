const User = require("../models/user");

// Render the sign-up page
module.exports.signIn = (req, res) => {
   return res.render("user_sign_in", {
      message: "Welcome to Online Banking Application",
   });
};

// Render the sign-up page
module.exports.signUp = (req, res) => {
   return res.render("user_sign_up", {
      message: "Welcome to Online Banking Application",
   });
};

// Sign in and create a session for user
module.exports.createSession = function (req, res) {
   return res.redirect("/");
};
// Get the signup data
module.exports.create = function (req, res) {
   // check password and conform password
   if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
   }

   // check whether email is present or not
   User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
         console.log("Error in finding user in signing up");
         return;
      }

      // create now account for new user if email is not present
      if (!user) {
         User.create(req.body, function (err, user) {
            if (err) {
               console.log("Error in creating user while signing up");
               return;
            }
            return res.redirect("/users/sign-in");
         });
      } else {
         return res.redirect("back"); // return back if email is present
      }
   });
};
