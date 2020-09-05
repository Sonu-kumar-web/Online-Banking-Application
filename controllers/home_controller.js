module.exports.home = (req, res) => {
   return res.render("home", {
      message: "Welcome to Online Banking Application",
   });
};
