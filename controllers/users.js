const User = require("../models/user");


module.exports.renderSignupForm = (req, res) => {
    // res.send("form");
    res.render("./users/signup.ejs");
};




module.exports.signup = async (req, res) => {

    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      // // store karna ke liye register ka use karte hai
      //   // register method : kud check kar leta hai unique hai ki nhi we dont nnedd to write
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      // after signup ye login hi rhe iskeliye 
      req.login(registeredUser, (err) => {
          if(err){
              return next(err);
          }
          // show the message when the user singup with a website.
          req.flash("success", "Welcome to WanderLust");
          res.redirect("/listings");
      });
  
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("signup");
    }
};



module.exports.renderLoginForm = (req, res) => {
    // res.send("form");
    res.render("./users/login.ejs");
};

module.exports.login = async(req,res) => {
    req.flash("success" , "Welcome back to wanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);  
};


module.exports.logout =  (req,res) => {
    req.logout( (err) =>{
        if(err){ 
           return  next(err);
        }
        req.flash("success" , "you are logged out!");
        res.redirect("/listings");
    })
};

