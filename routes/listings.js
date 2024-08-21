const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const {loggedin,isUser,validate}=require("../middleware.js");
const { populate } = require("../models/review.js");
const ListingController=require("../controller/listings");
const multer  = require('multer');
const {storage}=require("../CloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(ListingController.index))
.post(loggedin,upload.single('listing[image]'),validate,wrapAsync(ListingController.saveNewRoute));

//create new route
router.get("/new",loggedin,wrapAsync(ListingController.createNewRoute));

router.route("/:id")
.put(loggedin,isUser,upload.single('listing[image]'),wrapAsync(ListingController.updateRoute))
.get(wrapAsync(ListingController.showRoute))
.delete(loggedin,isUser,wrapAsync(ListingController.destroyRoute));


//edit route
router.get("/:id/edit",loggedin,wrapAsync(ListingController.editRoute));

//update route
// router.put("/:id",loggedin,isUser,wrapAsync(ListingController.updateRoute));

//delete route
// router.delete("/:id",loggedin,isUser,wrapAsync(ListingController.destroyRoute));

//new save route
// router.post("/",validate,loggedin,wrapAsync(ListingController.saveNewRoute));

//Index route
// router.get("/",wrapAsync(ListingController.index));

//show route
// router.get("/:id",wrapAsync(ListingController.showRoute));

module.exports=router;
