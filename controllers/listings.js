const Listing = require("../models/listing");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// index route
module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("./listings/index.ejs", { allListing });
};

// new route
module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
};

// show route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path :"reviews",
      populate: {
        path: "author"
      },
    })
    .populate("owner");
    if(!listing) {
      req.flash("error" , "Listing you requested for does not exits!");      
      res.redirect("/listings");
    }
    // console.log(listing); // owner ka data v print karne ke liiye 
    res.render("./listings/show.ejs", { listing });
};

// create Route
module.exports.createListing = async (req, res, next) => {
    // let {title , description , image ,price , country , location} = req.body;
    // let listing = req.body.listing;  // ye ek js object ke me aa rha hai so ise individully

    if(!req.body.listing){
        throw new ExpressError(400 , "Send valid data for listing");
    }

    // coordinates 
   let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
      .send() 
      

    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url , ".." , filename);

    const newListing = new Listing(req.body.listing);
    // new list save hone se phele us current user ka owner as a info save hona chhaiye
    newListing.owner = req.user.id;
    newListing.image = {url , filename} ;

    // save kara rhe hai goemetry model ke ander hmm jaha se hmm coorrdinates nikl rhe hai .
    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
 
    // flash wala code : create karna  
    req.flash("success" , "New Listing Created");      
    res.redirect("/listings");
};

// Edit route
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    // when a user goto edit page and not edit something then delte and then try to go to edit page so show the error flash
    if(!listing) {
      req.flash("error" , "Listing you requested for does not exits!");      
      res.redirect("/listings");
      return;
    }

    let originalImageUrl =  listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs", { listing , originalImageUrl });
};

// update Route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
  
    /// below if wla ke jage pe hmm fucntion use kar le rhe hai iskw uper
    // if(!req.body.listing){
    //   throw new ExpressError(400 , "Send valid data for listing");
    //   }
      
    // update in two parts so code ko Middleare bna diye hai jo use hoga isme uper : isOwner

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = { url , filename};
    await listing.save();
    }

    // when updated 
    req.flash("success" , " Listing Updated");      
    res.redirect(`/listings/${id}`);
 };


 // delete : route
module.exports.DestroyListing = async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    // delete ke liye : flash ko use kieyh
    req.flash("success" , " Listing Deleted");      

    res.redirect("/listings");
};



