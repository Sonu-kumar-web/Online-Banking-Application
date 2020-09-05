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

// Get the signup data
module.exports.create = (req, res) => {
   // todo
};

module.exports.createSession = (req, res) => {
   // todo
};
