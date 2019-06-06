export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: MongooseSchema.Types.ObjectId,
    ref: "User"
  },
  issue: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Issue"
  },
  category: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Category"
  },
  created: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Message", messageSchema);
