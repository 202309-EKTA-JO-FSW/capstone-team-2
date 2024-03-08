/*const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, TEST_DB_HOST } =
  process.env;

const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${
  process.env.NODE_ENV === "test" ? TEST_DB_HOST : DB_HOST
}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const url = DB_URI;

const connectToMongo = () => {
  mongoose.connect(url, { useNewUrlParser: true });

  db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected: ", url);
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
  });
};

module.exports = connectToMongo;
*/


require('dotenv').config();
const mongoose = require("mongoose");

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE, MONGODB_TEST_HOST } = process.env;

// Construct the MongoDB Atlas connection URI
const DB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToMongo = () => {
  mongoose.connect(DB_URI, options);

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected:", DB_URI);
  });

  db.on("error", (err) => {
    console.error("Database connection error:", err);
  });
};

module.exports = connectToMongo;
