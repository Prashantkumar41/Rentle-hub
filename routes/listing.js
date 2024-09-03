const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

// middleware for check user is logged in or not
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer( {storage});



// 4 : part 3 a
router
  .route("/")
  .get(wrapAsync(listingController.index))
  // Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing, // is route pe ye execute then niche ka perform hoga
    wrapAsync(listingController.createListing)
  );
   


//   New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
  .route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing, // is route pee aate hi pehel validate hogi then kcuh perfome hoga
    wrapAsync(listingController.updateListing)
  )

  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.DestroyListing)
  );

// index Route
router.get("/", wrapAsync(listingController.index));




// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router;
