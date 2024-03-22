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
    const authHeader = req.headers["authorization"];
    if(!authHeader){
      return res.sendStatus(401);
    };
    
    const accessToken = authHeader.split(' ')[1]  
    console.log("access: ",accessToken)
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

// Check if the user is admin
const verifyIsAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    const { role } = user;

    if (role === 'user') {
      return res.status(401).json({ message: "You are not authorized to view this page."});
    };

    next();

  } catch (err) {
    res.status(500).json({ message: err.message});
  };
};

module.exports = { 
  ensureAuth,
  ensureGuest,
  verifyIsAdmin
};

