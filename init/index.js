const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const mongoose_url="mongodb://127.0.0.1:27017/wonderlust";

main()
.then(
    (res)=>{console.log("Connected");}
)
.catch(
    (err)=>{console.log(err);}
);

async function main(){
    await mongoose.connect(mongoose_url);
}

const initdb=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'66b6e9ae38ea8ac236c45f07'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialize");
}
initdb();