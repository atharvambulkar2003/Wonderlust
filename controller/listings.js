const Listing=require("../models/listing");
const ExpressError=require("../utils/ExpressError");
module.exports.index=async(req,res,next)=>{
    let data=await Listing.find();
    res.render("Listings/index.ejs",{data});
};
module.exports.editRoute=async(req,res,next)=>{
    let {id}=req.params;
    let listings=await Listing.findById(id);
    if(!listings){
        req.flash("error","Listings is not exist !");
        res.redirect("/listings");
    }
    let originalUrl=listings.image.url;
    let newUrl=originalUrl.replace("/upload","/upload/w_250");
    res.render("Listings/edit.ejs",{listings,newUrl});
};
module.exports.createNewRoute=(req,res,next)=>{
    res.render("Listings/new.ejs");
};
module.exports.updateRoute=async(req,res,next)=>{
    if(!req.body.listings){
        throw new ExpressError(400,"Data was not send");
    }
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listings});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Updated successfully!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyRoute=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listings successfully deleted!");
    res.redirect("/listings");
};
module.exports.saveNewRoute=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(url,"..",filename);
    const user=new Listing(req.body.listing);
    user.owner=req.user._id;
    user.image={url,filename};
    await user.save();
    req.flash("success","New Listing Is Created!");
    res.redirect("/listings");
};
module.exports.showRoute=async(req,res,next)=>{
    let {id}=req.params;
    let listings = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    res.render("Listings/show.ejs",{listings});
};