const express = require("express");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const adminRoutes = require('./routes/adminRoute');
const userRoute = require("./routes/userRoute");

require("dotenv").config();

// Passport config
require('./config/googleConfig')(passport);


const connectToMongo = require("./db/connection");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sessions
app.use(cookieParser('foodie'));
app.use(session({
secret : 'foodie',
cookie : {
expires: false,
},
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/googleRoute'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.get("/test", (req, res) => {
  res.json(
    "Server connection to client works!!  Good Luck with your capstones :D"
  );
});

app.use('/admin', adminRoutes);
app.use("/user", userRoute);

module.exports = app;
