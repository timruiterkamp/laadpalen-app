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
    required: true
  },
  status: {
    type: String,
    required: false
  },
  polenumber: {
    type: Number,
    required: false
  },
  created: {
    type: Date,
    required: false
  },
  confirmed: {
    type: Number,
    required: false
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
