if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}


// console.log(process.env.SECREAT); 

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const session  = require("express-session");
const flash  = require("connect-flash");
 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// async fun for mongodb // DB
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const sessionOptions = {
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized: true ,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000, 
    httpOnly:true,
  },
};


// app.get("/", (req, res) => {
//   res.send("Hi , I am a root");
// });


app.use(session(sessionOptions));
app.use(flash());


// passport ke liye :
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy (User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// flash --> use kar rhe hai flash ko 
app.use( (req,res , next) => {
  res.locals.success = req.flash("success");
  // error : when the lisitng does not exits
  res.locals.error = req.flash("error");

  // locals variable ke ander hmm req.user ko store kar rhe hai taki hmm ejs template ke ander use kar paye.
  // yha pe hm req.user ko local bna rhe h bcz hmm isko user kar paye navbar me
  res.locals.currUser = req.user;
  // console.log(res.locals.success); // success ko print kara rhe the 
  next();
});  
  
// app.get("/demouser" , async (req,res) => {
//   let fakeUser = new User ({
//     email : "student@gmail.com",
//     username : "prashant123"
//   });

//   // store karna ke liye register ka use karte hai 
//   // register method : kud check kar leta hai unique hai ki nhi we dont nnedd to write  
//   let registerUser = await User.register(fakeUser , "password" );
//   res.send(registerUser);
// });



app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/" , userRouter);
 

// app.get("/testListing" , async(req, res) => {
//     let sampleListing = new Listing( {
//         title : "my new villa",
//         description : "by the beach",
//         price : 1500,
//         location : "siwan",
//         country:"india",
//     });

//     await sampleListing.save();
//     console.log("smaple was saved");
//     res.send("successful testing");
// });

// if developer search any randome route jo 
// route exit hi mhi kartahai to hmme 
// ek standard response bejna chhate hai

app.all("*" , (req, res ,next) =>{
    next(new ExpressError(404, "Page Not Found!"));
})


// error handling
app.use((err, req, res, next) => {
    // deconstruct 
    let {statusCode=500 , message="something went wrong!"} = err;
    res.status(statusCode).render("error.ejs" ,  {message});

    
    // res.status(statusCode).send(message);

});

app.listen(8080, () => {
  console.log("server is running");
});






