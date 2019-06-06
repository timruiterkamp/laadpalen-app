const Mongoose = require("mongoose");
const MongooseSchema = Mongoose.Schema;
const issueSchema = new MongooseSchema({
  title: {
    type: String,
    required: true
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
    required: true
  },
  polenumber: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    required: true
  },
  confirmed: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Confirmed"
  },
  messages: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Message"
  },
  history: {
    type: MongooseSchema.Types.ObjectId,
    ref: "History"
  },
  image: {
    type: String,
    required: true
  },
  creator: {
    type: MongooseSchema.Types.ObjectId,
    ref: "User"
  },
  stakeholder: {
    type: MongooseSchema.Types.ObjectId,
    ref: "Stakeholder"
  }
});

module.exports = Mongoose.model("Issue", issueSchema);
