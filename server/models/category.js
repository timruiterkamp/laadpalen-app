"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    stakeholders: {
        type: Schema.Types.ObjectId,
        ref: "Stakeholder"
    },
    issues: {
        type: Schema.Types.ObjectId,
        ref: "Issue"
    },
    messages: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    }
});
module.exports = mongoose.model("Category", categorySchema);
