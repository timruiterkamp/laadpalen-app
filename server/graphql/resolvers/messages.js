"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageModel = require("../../models/message");
var transformMessage = require("./merge").transformMessage;
var User = require("../../models/user");
var Issue = require("../../models/issue");
module.exports = {
    messages: function () {
        return MessageModel.find()
            .then(function (messages) {
            return messages.map(function (message) {
                return transformMessage(message);
            });
        })
            .catch(function (err) {
            throw err;
        });
    },
    createMessage: function (args, req) {
        var message = new MessageModel({
            message: args.messageInput.message,
            createdAt: args.messageInput.createdAt,
            user: req.userId,
            issues: args.messageInput.issueId,
            categories: args.messageInput.categoryId
        });
        var createdMessage = {};
        return message
            .save()
            .then(function (result) {
            createdMessage = transformMessage(message);
            return User.findById(req.userId);
        })
            .then(function (user) {
            if (!user) {
                throw new Error("User not found.");
            }
            user.createdMessages.push(message);
            return user.save();
        })
            .then(function (res) {
            return Issue.findById(args.messageInput.issueId);
        })
            .then(function (issue) {
            if (!issue) {
                throw new Error("Issue not found");
            }
            issue.messages.push(message);
            issue.save();
        })
            .then(function (res) {
            return createdMessage;
        })
            .catch(function (err) {
            throw err;
        });
    }
};
