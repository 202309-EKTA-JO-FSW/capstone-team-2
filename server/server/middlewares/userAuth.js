/***********************************ramah */

const UserModel = require("../models/user");
const BlackListModel = require("../models/blackList");
const jwt = require("jsonwebtoken");
const cookie = require('cookie');

const verifySignin = async (req, res, next) => {
   try {
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

const verifyIsAdmin = (req, res, next) => {
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

module.exports = {verifySignin, 
                  verifyIsAdmin};


/********************************************* */