const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {validateReview,loggedin,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controller/review.js");

//review
router.post("/",loggedin,validateReview,wrapAsync(reviewController.createReview));

//review delete
router.delete("/:reviewId",loggedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;