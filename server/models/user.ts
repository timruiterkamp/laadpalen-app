const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  lastLoggedIn: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
