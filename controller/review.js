const Listing=require("../models/listing");
const Review=require("../models/review");
module.exports.createReview=async(req,res,next)=>{
    let {id}=req.params;
    let listings=await Listing.findById(id);
    
    const newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview.author);
    listings.reviews.push(newReview);

    await newReview.save();
    await listings.save();

    req.flash("success","New review Added!");

    res.redirect(`/listings/${id}`);
};
module.exports.destroyReview=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};