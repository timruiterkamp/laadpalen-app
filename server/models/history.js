"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var historySchema = new Schema({
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
    stakeholders: {
        type: MongooseSchema.Types.ObjectId,
        ref: "Stakeholder"
    },
    date: {
        type: String,
        required: true
    },
    messages: {
        type: MongooseSchema.Types.ObjectId,
        ref: "Message"
    }
});
module.exports = mongoose.model("History", historySchema);
