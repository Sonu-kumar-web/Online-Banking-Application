const express = require("express");
const router = express.Router();
const passport = require("passport");

const transferController = require("../controllers/transfer_controller");

router.get("/:id", passport.checkAuthentication, transferController.transfer);

router.post(
   "/update/:id",
   passport.checkAuthentication,
   transferController.update
);

module.exports = router;
