/****************************ramah */
module.exports = {
    // For a user who's logged in
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
  
      } else {
        res.redirect('/user')
      };
    },
    
    // For a user who's not logged in
    ensureGuest: function (req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect('/test');
  
      } else {
        return next();
      };
    }
  };
  /********************************* */