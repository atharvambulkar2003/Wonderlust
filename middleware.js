const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
module.exports.loggedin=((req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Login Required!");
        res.redirect("/login");
    }
    next();
});
module.exports.redirectToPage=((req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectTo=req.session.redirectUrl;
    }
    next();
});
module.exports.isUser=(async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.userInfo._id)){
        req.flash("error","You don't have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
});
module.exports.validate=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,"Cannot upload page");
    }else{
        next();
    }
};
module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
};
module.exports.isReviewAuthor=(async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.userInfo._id)){
        req.flash("error","You don't have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();

});
