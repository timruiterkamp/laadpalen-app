"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IssueModel = require("../../models/issue");
var transformIssue = require("./merge").transformIssue;
var User = require("../../models/user");
module.exports = {
    issues: function () {
        return IssueModel.find()
            .then(function (issues) {
            return issues.map(function (issue) {
                return transformIssue(issue);
            });
        })
            .catch(function (err) {
            throw err;
        });
    },
    updateIssue: function (issueId) {
        return IssueModel.findById(issueId)
            .then(function (issue) {
            return transformIssue(issue);
        })
            .catch(function (err) {
            throw err;
        });
    },
    createIssue: function (args, req) {
        var issue = new IssueModel({
            title: args.issueInput.title,
            description: args.issueInput.description,
            location: args.issueInput.location,
            status: args.issueInput.status,
            polenumber: args.issueInput.polenumber,
            createdAt: args.issueInput.createdAt,
            creator: req.userId,
            image: args.issueInput.image,
            stakeholders: args.issueInput.stakeholderId
        });
        var createdIssue = {};
        if (!req.userId) {
            return issue
                .save()
                .then(function (result) {
                createdIssue = transformIssue(issue);
            })
                .then(function (res) {
                return createdIssue;
            })
                .catch(function (err) {
                throw err;
            });
        }
        return issue
            .save()
            .then(function (result) {
            createdIssue = transformIssue(issue);
            console.log(req.userId);
            return User.findById(req.userId);
        })
            .then(function (user) {
            if (!user) {
                throw new Error("User not found.");
            }
            user.createdIssues.push(issue);
            return user.save();
        })
            .then(function (res) {
            return createdIssue;
        })
            .catch(function (err) {
            throw err;
        });
    }
};
