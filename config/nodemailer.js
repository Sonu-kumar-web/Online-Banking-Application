const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");

let transporter = nodemailer.createTransport({
   service: "gmail",
   host: "smtp.gmail.com",
   port: 587,
   secure: false,
   auth: {
      // Please Enter valid email amd password to sent the mail
      user: "sonu3660@gmail.com",
      pass: "11",
   },
});

let renderTemplate = (data, relativePath) => {
   let mailHTML;
   ejs.renderFile(
      path.join(__dirname, "../view/mailers", relativePath),
      data,
      function (err, template) {
         if (err) {
            console.log("Error in rendering template");
            return;
         }
         mailHTML = template;
      }
   );
   return mailHTML;
};

module.exports = {
   transporter,
   renderTemplate,
};
