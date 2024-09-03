const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
// Joi : validation ka use : so we use Joi
const { listingSchema , reviewSchema } = require("./schema.js");




module.exports.isLoggedIn = (req,res,next) => {
    // user log in hai ki nhi ager nhi show error
    if(!req.isAuthenticated()){
        // console.log(req);
        // console.log(req.path , "..." , req.originalUrl);

        // req.originalUrl : before login user access the path 
        // then required login --> after login the user redirect the 
        // same path jo wo login se pehele path ko access ke liye try 
        // kar rha tha : kaise : req.OriginalUrl ki help se ye route deta hai 
        req.session.redirectUrl = req.originalUrl;

        req.flash("error" , "You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async (req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if( !listing.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error" , "You are the not owner of this listings");
      return res.redirect(`/listings/${id}`)
    }
    next();
};

module.exports.validateListing = (req, res ,next) =>{
    // Joi : validation lagya hai individual ke uper 
    let {error} = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map( (el) => el.message).join(","); 
      throw new ExpressError(400 ,  errMsg);
    } else{
      next();
    } 
  };


  // validation for Review : review ko validate karna 
module.exports.ValidateReview = (req, res ,next) =>{
      // Joi : validation lagya hai individual ke uper 
      let {error} = reviewSchema.validate(req.body);
      if(error){
        let errMsg = error.details.map( (el) => el.message).join(","); 
        throw new ExpressError(400 ,  errMsg);
      } else{
        next();
      }
};





module.exports.isReviewAuthor = async (req,res,next) => {
  let {id , reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if( !review.author.equals(res.locals.currUser._id)) {
    req.flash("error" , "You are the not author of this review");
    return res.redirect(`/listings/${id}`)
  }
  next();
}; 