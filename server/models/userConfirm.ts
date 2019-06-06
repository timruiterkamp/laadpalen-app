export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  user: {
    type: MongooseSchema.Types.ObjectId,
    ref: "User"
  },
  issue: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Issue"
  },
  count: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Message", messageSchema);
