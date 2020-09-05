module.exports.home = (req, res) => {
   if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
   }
   return res.render("home", {
      message: "Welcome to Online Banking Application",
   });
};
