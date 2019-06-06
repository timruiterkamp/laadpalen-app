const Mongoose = require("mongoose");
const MongooseSchema = Mongoose.Schema;
const eventSchema = new MongooseSchema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    creator: {
      type: MongooseSchema.Types.ObjectId,
      ref: "User"
    }
  },
  { strict: false }
);

module.exports = Mongoose.model("Event", eventSchema);
