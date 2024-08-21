const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const passport = require("passport");
const wrapAsync=require("../utils/wrapAsync.js");
const { redirectToPage } = require("../middleware.js");
const userController=require("../controller/user.js");

router.route("/login")
.get(userController.loginFormGetRoute)
.post(redirectToPage,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);

router.route("/signup")
.get(userController.signupGetRoute)
.post(wrapAsync(userController.signUpPostRoute));


// router.get("/signup",userController.signupGetRoute);

// router.post("/signup",wrapAsync(userController.signUpPostRoute));

// router.get("/login",userController.loginFormGetRoute);

// router.post("/login",redirectToPage,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports=router;