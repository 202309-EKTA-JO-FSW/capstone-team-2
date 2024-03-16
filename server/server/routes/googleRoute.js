const express = require("express");
const router = express.Router();
const passport = require('passport');


// @desc authenticate with Google 
// @route /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc Google auth callback
// @route /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user' }), (_, res) => {
  // res.redirect('/test');
  res.redirect('http://localhost:3000/userprofile/65e78a0fdc1e5b0138a6c1cc');
}); 

module.exports = router;