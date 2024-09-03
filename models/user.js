const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email: {
        type : String,
        required:true,
    },
});
// need nhi hai username and password define karne ki bcz 
// bydefault kud kar deta hai. 

// ye automatic implement kar deta hai username , password , salt and hash ko  so we dont need to implement 
userSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model("User" , userSchema);