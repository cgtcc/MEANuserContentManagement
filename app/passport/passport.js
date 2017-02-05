var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var session = require('express-session');

module.exports = function(app, passport) {

    //MIDDLEWARES
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat',
                              resave:false,
                              saveUninitialized:true,
                              cookie:{secure:true}
                            }));



/*In a typical web application, the credentials used to authenticate a user will only be 
transmitted during the login request. If authentication succeeds, a session will 
be established and maintained via a cookie set in the user's browser.

Each subsequent request will not contain credentials, but rather the unique 
cookie that identifies the session. In order to support login sessions, 
Passport will serialize and deserialize user instances to and from the session.
*/
        passport.serializeUser(function(user, done) {
        done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
        });


/*

The verify callback for Facebook authentication accepts accessToken, refreshToken, 
and profile arguments. profile will contain user profile information provided by Facebook;
 refer to User Profile for additional information.

Note: For security reasons, the redirection URL must reside on the same host that is 
registered with Facebook.


*/
    passport.use(new FacebookStrategy({
    clientID: 162925420867838,
    clientSecret: '6a1a5160beba040b187727552ebf6c90',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'null']
  },
  function(accessToken, refreshToken, profile, done) {
  //  User.findOrCreate(..., function(err, user) {
   //   if (err) { return done(err); }
   //   done(null, user);
  //  });
  console.log(profile); //for testing

   done(null, profile);
  }
));

//ROUTES REQUISES POUR FACEBOOK 
/*
Two routes are required for Facebook authentication. The first route redirects 
the user to Facebook. The second route is the URL to which Facebook will redirect 
the user after they have logged in.
*/
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook', {scope : 'email'}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }));


    return passport;
}