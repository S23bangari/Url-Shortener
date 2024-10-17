const { getUser } = require('../service/auth')


function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.uid;  // Use 'uid' as the cookie name for the token
    req.user = null;
    
    if (!tokenCookie) return next();  // If no token, skip to next middleware

    const token = tokenCookie;
    try {
        const user = getUser(token);  // Verify and extract the user from the token
        req.user = user;  // Assign the user correctly to req.user
    } catch (err) {
        console.error('Error verifying token:', err);
        // If there's an error verifying the token, proceed without a user
    }
    
    return next();
}

function restrictTo(roles) {
    return function (req, res, next) {
        // Log user for debugging purposes
        console.log('Current User:', req.user);

        // If no user, redirect to login
        if (!req.user) return res.redirect('/login');

        // Check if the user has the required role
        if (!roles.includes(req.user.role)) {
            console.log(`User's role is: ${req.user.role}, but access is restricted to roles: ${roles}`);
            return res.end("Unauthorized");
        }

        next();
    };
}


// async function restrictToLoggedinUserOnly(req,res,next){
//     const userUid = req.cookies?.uid;

//     if(!userUid) return res.redirect("/login");
//     const user = getUser(userUid);

//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next){

//     const userUid = req.cookies?.uid;
    
//     const user = getUser(userUid);

//     req.user = user;
//     next();
// }


module.exports = {
    checkForAuthentication,
    restrictTo,
}