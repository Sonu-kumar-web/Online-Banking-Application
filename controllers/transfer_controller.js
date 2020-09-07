const User = require("../models/user");
const transferMailer = require("../mailers/transfer_mailer");

module.exports.transfer = (req, res) => {
   User.findById(req.params.id, function (err, user) {
      return res.render("money_transfer", {
         profile_user: user,
      });
   });
};

// for update balance
module.exports.update = async function (req, res) {
   if (req.user.id == req.params.id) {
      try {
         if (req.body.password != req.user.password) {
            console.log("Invalid Account number or password");
            return res.redirect("back");
         }

         if (req.body.transfer == "One-time fund transfer") {
            let user = await User.findOne({
               accountNumber: req.body.account_number,
            });

            if (user.name != req.body.account_holder_name) {
               console.log("Invalid Account number or password");
               return res.redirect("back");
            }
            if (user) {
               if (req.user.balance < req.body.amount) {
                  console.log("Insufficient Balance");
                  return res.redirect("back");
               } else {
                  // initial balance
                  let my_amount = req.user.balance;

                  let transfer_amount = req.body.amount;

                  // final balance
                  my_amount = my_amount - transfer_amount;

                  let your_amount =
                     parseInt(transfer_amount) + parseInt(user.balance);

                  // Update my balance
                  req.user.balance = my_amount;

                  user.balance = your_amount;
               }
            }
            req.user.save();
            user.save();

            // Send the email
            user = await user.populate("user", "name email").execPopulate();
            transferMailer.newTransfer(user);

            return res.redirect("/users/profile");
         } else {
            return res.redirect("back");
         }
      } catch (error) {
         return res.redirect("back");
      }
   } else {
      return res.status(401).send("Unauthorized");
   }
};
