const User = require("../models/user");
const Faker = require("faker");

// Render the profile page
module.exports.profile = function (req, res) {
   User.findById(req.params.id, function (err, user) {
      return res.render("user_profile", {
         // Render views/users_profile file to the server
         title: "user_profile",
         profile_user: user,
      });
   });
};

// Render the sign-in page
module.exports.signIn = (req, res) => {
   if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
   }
   return res.render("user_sign_in", {
      message: "Welcome to Online Banking Application",
   });
};

// Render the Sign-up page
module.exports.signUp = (req, res) => {
   if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
   }
   return res.render("user_sign_up", {
      message: "Welcome to Online Banking Application",
   });
};

// Sign in and create a session for user
module.exports.createSession = function (req, res) {
   return res.redirect("/users/profile");
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
         User.create(
            {
               email: req.body.email,
               password: req.body.password,
               name: req.body.name,
               accountNumber: Faker.finance.account(),
               balance: 1000,
            },
            function (err, user) {
               if (err) {
                  console.log("Error in creating user while signing up", err);
                  return;
               }
               return res.redirect("/users/sign-in");
            }
         );
      } else {
         return res.redirect("back"); // return back if email is present
      }
   });
};

// Sign Out and destroy the current session
module.exports.destroySession = function (req, res) {
   req.logout();
   return res.redirect("/");
};
