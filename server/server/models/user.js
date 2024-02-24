const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    // required: true,
    select: false,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    // required: true,
  },

  phone: {
    type: Number,
    // required: true,
    validate: {
      validator: function (v) {
        // This regex allows numbers, spaces, parentheses, and hyphens
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number format`,
    },
  },

  preferences: {
    type: String,
  },

  profilePicture: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Hashing the password
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// JWT Token method.
userSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "3h",
  });
};

module.exports = mongoose.model("UserModel", userSchema);

/*
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        // This regex allows numbers, spaces, parentheses, and hyphens
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number format`,
    },
  },

  preferences: {
    type: String,
  },

  profilePicture: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);



*/
