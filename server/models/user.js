"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdIssues: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ],
    createdMessages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    lastLoggedIn: {
        type: Date,
        required: false
    }
});
module.exports = mongoose.model("User", userSchema);
