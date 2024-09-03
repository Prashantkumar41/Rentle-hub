// const { string } = require("joi");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req, res) =>{
  
    // review ko add karne karne ke listing ko add karna pdega
   let listing =  await Listing.findById(req.params.id);
   // error ke liye handle : cast to Number
   // const rating = parseInt(req.body.review.rating);
//    console.log("rating" , rating);
   // console.log(req.body.review.rating);
   // const comment = string(req.body.review.comment);
   

   // review ko create karo 
   let newReview = new Review(req.body.review); // ye mam wala code hai jo errore de rha hai 
   // let  newReview = new Review({
   //    rating,
   //    comment,
   //  });

    // this is code part of E and video  : 9 
    // we can store the reviews author : jo reviews de rha hai uska data store kara rhe hai
    newReview.author = req.user._id;
    console.log(newReview);
    // console.log(newReview);  // print  v kara skte hai reviws kko 
    

    // hmmne review ke liye review.js me array me bnaya hai so 
    // review uper create ho gya hai so , usko us array me dalnahoga 
    // so 
    listing.reviews.push(newReview);
    
    
    // afer push into array hm save kar denge review ko and list ko    
    await newReview.save();
    console.log(req.body.review.rating);
    console.log(newReview);
    // console.log(req.body.review);
   await listing.save();
  
   // new review create hua to flash ka use krke message show kara skte hai
   req.flash("success" , "New Review Created");      

   // redirect kar do list ke id pe ja review submit hua hai
   res.redirect(`/listings/${listing._id}`);
};



module.exports.destroyReview = async (req, res) => {
    let {id , reviewId} = req.params;

    // reviews ke array me se v to delete karna hoga paritculr reviesId ko 
    await Listing.findByIdAndUpdate(id , {$pull: {reviews:reviewId}});
    
    // review delete hoga , reviewID ke based pe 
    await Review.findByIdAndDelete(reviewId);

    // when review deleted : hm flash ka use krkr message pop upkara skte h
    req.flash("success" , " Review Deleted");      


    // after deletion redirect the 
    res.redirect(`/listings/${id}`);
};


