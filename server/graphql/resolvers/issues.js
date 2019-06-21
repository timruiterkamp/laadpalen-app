"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IssueModel = require("../../models/issue");
var LoadingstationModel = require("../../models/loadingstation");
var _a = require("./merge"), transformIssue = _a.transformIssue, transformLoadingstation = _a.transformLoadingstation;
var User = require("../../models/user");
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
module.exports = {
    issue: function (params) {
        return IssueModel.findById(params.id)
            .then(function (issue) {
            return transformIssue(issue);
        })
            .catch(function (err) {
            throw err;
        });
    },
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
            stakeholders: args.issueInput.stakeholderId,
            loadingstation: args.issueInput.loadingstationId
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
            /* Write issue to User */
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
            /* Write issue to loadingstation */
            return LoadingstationModel.findById(issue.loadingstation);
        })
            .then(function (loadingstation) {
            if (!loadingstation) {
                throw new Error("Loadingstation not found.");
            }
            loadingstation.issues.push(issue);
            return loadingstation.save();
        })
            .then(function (res) {
            return createdIssue;
        })
            .catch(function (err) {
            throw err;
        });
    }
};
// exports = module.exports = function((io: any)){
//   io.sockets.on('connection', function (socket) {
//     socket.on('file1Event', function () {
//       console.log('file1Event triggered');
//     });
//   });
// }
