const express = require("express");
const user = require("../models/user");
const router = express.Router();
const User =require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")
const {saveRedirectUrl} =require("../middleware.js")
const userController =require("../controllers/users.js")

//render signup  and sign up
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup)
)

//render login and login
router.route("/login")
.get(userController.renderloginForm)
.post( saveRedirectUrl,
passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}), 
userController.login );

//logout
router.get("/logout",userController.logout);


module.exports =router;