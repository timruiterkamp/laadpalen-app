export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  issue: {
    type: Schema.Types.ObjectId,
    ref: "Issue"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  createdAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Message", messageSchema);
