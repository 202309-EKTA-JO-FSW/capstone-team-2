const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
//   dishID: {
//     type: Schema.Types.ObjectId,
//     ref: "dishSchema",
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//     default: 1,
//   },
//   specificRequests: {
//     type: String,
//   },
});

module.exports = mongoose.model("cartSchema", cartSchema);
