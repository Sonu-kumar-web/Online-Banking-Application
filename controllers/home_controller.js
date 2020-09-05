module.exports.home = (req, res) => {
   return res.render("home", {
      title: "Welcome to Online Banking Application",
   });
};
