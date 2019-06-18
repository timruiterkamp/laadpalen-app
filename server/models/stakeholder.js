"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stakeholderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    issues: [
        {
            type: Schema.Types.ObjectId,
            ref: "Issue"
        }
    ]
});
module.exports = mongoose.model("Stakeholder", stakeholderSchema);
