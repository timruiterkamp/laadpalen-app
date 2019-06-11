export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    issues: {
      type: Schema.Types.ObjectId,
      ref: "Issue"
    },
    categories: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    createdAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
