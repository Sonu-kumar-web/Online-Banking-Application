const nodeMailer = require("../config/nodemailer");

exports.newTransfer = (transfer) => {
   let htmlString = nodeMailer.renderTemplate(
      { transfer: transfer },
      "/transfer.ejs"
   );
   nodeMailer.transporter.sendMail(
      {
         //Please Enter valid email amd password to sent the mail
         from: "sonu3660@gmail.com",
         to: "transfer.user.email",
         subject: "New Payment fund transfer",
         html: htmlString,
      },
      (err, info) => {
         if (err) {
            console.log("Error in sending email", err);
            return;
         }
         console.log("message sent", info);
         return;
      }
   );
};
