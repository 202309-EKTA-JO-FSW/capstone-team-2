/********************************ramah */
const express = require("express");
const router = express.Router();
const passport = require('passport');


// @desc authenticate with Google 
// @route /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc Google auth callback
// @route /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user' }), (_, res) => {
  res.redirect('/test');
}); 

// @desc Logout user
// @route /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { 
      return next(err); 
    };
    req.session.destroy();
    res.redirect('/user');
  });
});

module.exports = router;