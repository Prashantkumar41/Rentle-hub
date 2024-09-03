const  mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL  = "mongodb://127.0.0.1:27017/wanderlust";


main()
    .then( () => {
    console.log("connected to DB");
})
    .catch( (err) => {
    console.log(err);
});

// async fun for mongodb
async function main(){
    await mongoose.connect(MONGO_URL);
}
 
const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map( (obj) => ({
    ...obj ,
    owner:'66c739136f25340dc6632b94'
    }));

    await Listing.insertMany(initData.data); // data.js me data hai usko le liye
    console.log("data was initialized");    
};

initDB();

