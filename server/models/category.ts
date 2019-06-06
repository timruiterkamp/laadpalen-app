export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  stakeholder: {
    type: Schema.Types.ObjectId,
    ref: "Stakeholder"
  },
  issues: {
    type: Schema.Types.ObjectId,
    ref: "Issue"
  }
});

module.exports = mongoose.model("Category", categorySchema);
