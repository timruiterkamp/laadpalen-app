export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  stakeholder: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Stakeholder"
  },
  messages: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Message"
  }
});

module.exports = mongoose.model("Category", categorySchema);
