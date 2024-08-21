const Listing=require("../models/listing");
const Review=require("../models/review");
const User=require("../models/user");
module.exports.signupGetRoute=(req,res)=>{
    res.render("user/signup.ejs");
};
module.exports.signUpPostRoute=async(req,res)=>{
    try{
        let{username,password,email}=req.body;
        const newUser=new User({email,username});
        let result=await User.register(newUser,password);
        req.login(result,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","User registered successfully");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};
module.exports.loginFormGetRoute=(req,res)=>{
    res.render("user/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("success","User login successfully");
    let redirectNew=res.locals.redirectTo||"/listings";
    res.redirect(redirectNew);
};
module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logout successfully!");
        res.redirect("/listings");
    });
};