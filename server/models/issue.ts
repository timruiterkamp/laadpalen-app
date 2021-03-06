export {};
const Mongoose = require("mongoose");
const MongooseSchema = Mongoose.Schema;
const issueSchema = new MongooseSchema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Category"
  },
  location: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  polenumber: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  },
  confirmed: {
    type: Number,
    required: false
  },
  loadingstation: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Loadingstation"
  },
  messages: [
    {
      type: MongooseSchema.Types.ObjectId,
      ref: "Message"
    }
  ],
  history: {
    type: MongooseSchema.Types.ObjectId,
    ref: "History"
  },
  image: {
    type: String,
    required: false
  },
  creator: {
    type: MongooseSchema.Types.ObjectId,
    ref: "User"
  },
  stakeholders: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Stakeholder"
  }
});

module.exports = Mongoose.model("Issue", issueSchema);
