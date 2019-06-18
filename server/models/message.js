"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    issues: {
        type: Schema.Types.ObjectId,
        ref: "Issue"
    },
    categories: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    createdAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model("Message", messageSchema);
