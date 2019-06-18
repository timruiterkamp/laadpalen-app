"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messageSchema = new Schema({
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
