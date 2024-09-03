const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");


const userController = require("../controllers/users");

router
.route("/signup")
router.get("/signup", userController.renderSignupForm)
// post router
.post("/signup", wrapAsync(userController.signup ));


router.route("/login")
.get( userController.renderLoginForm )
// passport by default authenticate karta hai correct haiki nhi as a MIDDLEWARE se 
// passport.authtenticate  : middleware
.post(
  saveRedirectUrl , // OriginalUrl : ke liye hai locals me save hua hai isliye
  passport.authenticate('local',{
      failureRedirect:"/login",
      failureFlash: true,
  }), 
  userController.login
);


// LOG OUT
router.get("/logout" , userController.logout);

module.exports = router;
