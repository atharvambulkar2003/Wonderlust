const mongoose=require("mongoose");
const passPortLocalMongoose=require("passport-local-mongoose");

const userSchema=new mongoose.Schema({//passport will automatically add username,salting,hashing and password we can add name,dob, and other things to userSchema
    email:{
        type:String,
        required:true,
    },
});

userSchema.plugin(passPortLocalMongoose);

module.exports=mongoose.model("User",userSchema);