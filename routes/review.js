const express = require("express");
const router = express.Router({mergeParams:true });

const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

// review ke liye hmm require karnge review model ko 
const Review = require("../models/review.js");

const {ValidateReview , isLoggedIn ,isReviewAuthor } = require("../middleware.js");

const reviewController  = require("../controllers/reviews.js");
 
// Reviews ke liye code part 2A 
// POST route 
router.post("/" ,
  isLoggedIn ,  // for no anyone create a review through hopsctoch or any tool 
  ValidateReview , 

  wrapAsync(reviewController.createReview));
  

  // Delete  Review Route
  router.delete("/:reviewId" ,
    isLoggedIn,
    isReviewAuthor ,
    wrapAsync(reviewController.destroyReview)
  );

module.exports = router;
