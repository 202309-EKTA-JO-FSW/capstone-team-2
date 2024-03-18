const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get("/user", async (req, res) => {
  await res.json(req.user);
})

router.get("/login/failed", (req, res) => {
  res.status(401).json({
      error: true,
      message: "Log in failure",
  });
});

// @desc authenticate with Google 
// @route /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc Google auth callback
// @route /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { successRedirect: 'http://localhost:3000/login/success',failureRedirect: '/login/failed' }), (req, res) => {
    res.redirect("/userprofile")
}); 

module.exports = router;