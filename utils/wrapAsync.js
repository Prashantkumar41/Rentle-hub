module.exports = (fn) => {
    return  (req , res , next ) => {
        fn(req , res ,next).catch(next);
    };
};

// this is wrapAsync fun that handle a 
// error 