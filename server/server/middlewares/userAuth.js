const UserModel = require("../models/user");
const BlackListModel = require("../models/blackList");
const jwt = require("jsonwebtoken");
const cookie = require('cookie');

// For a user who's logged in
const ensureAuth = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }; 

    const authHeader = req.headers["cookie"];

    if(!authHeader){
      return res.sendStatus(401);
    };
    
    const cookies = cookie.parse(authHeader);
    const accessToken = cookies["SessionID"];  

    if (!accessToken) {
     return res.sendStatus(401);
   };
   
   const checkIfBlackListed = await BlackListModel.findOne({ token:  accessToken});

   if (checkIfBlackListed) {
     return res.status(401).json({ message: 'This session has expired. Please login'})
   }

   jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "This session has expired. Please login" });
      };

      const { id } = decoded;
      const user = await UserModel.findById(id);
      const { password, ...data } = user._doc;
      req.user = data;
      next();
    });

  } catch (err) {
     res.status(500).json({ message: err.message})
  };
};

// For a user who's not logged in
const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/test');

  } else {
    return next();
  };
};


module.exports = { 
  ensureAuth,
  ensureGuest,
};

