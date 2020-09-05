module.exports.signIn = (req, res) => {
   return res.render("user_sign_in", {
      message: "Welcome to Online Banking Application",
   });
};

module.exports.signUp = (req, res) => {
   return res.render("user_sign_up", {
      message: "Welcome to Online Banking Application",
   });
};
