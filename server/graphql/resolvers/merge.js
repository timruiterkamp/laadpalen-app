"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
var User = require("../../models/user");
var IssueModel = require("../../models/issue");
var MessageModel = require("../../models/message");
var CategoryModel = require("../../models/category");
var StakeholderModel = require("../../models/stakeholder");
var LoadingstationModel = require("../../models/loadingstation");
var dateToString = require("../../helpers/date").dateToString;
var transformIssue = function (issue) {
    return __assign({}, issue._doc, { _id: issue.id, createdAt: new Date(issue.createdAt).toISOString(), creator: user.bind(_this, issue.creator), messages: messages.bind(_this, issue._doc.messages), stakeholders: stakeholder.bind(_this, issue.stakeholders), loadingstation: loadingstation.bind(_this, issue.loadingstation) });
};
// const transformLoadingstation = (loadingstation: any) => {
//   console.log(loadingstation._doc)
//   return {
//     ...loadingstation._doc,
//     _id: loadingstation.id,
//     issues: issues.bind(this, loadingstation.issues)
//   };
// };
var transformMessage = function (message) {
    return __assign({}, message._doc, { _id: message.id, user: user.bind(_this, message.user), createdAt: new Date(message.createdAt).toISOString(), updatedAt: new Date(message.updatedAt).toISOString(), issues: issues.bind(_this, message.issues), categories: categories.bind(_this, message.categories) });
};
var transformUser = function (user) {
    return __assign({}, user._doc, { _id: user.id, createdIssues: issues.bind(_this, user._doc.createdIssues), createdMessages: messages.bind(_this, user._doc.createdMessages) });
};
var transformCategory = function (category) {
    return __assign({}, category._doc, { _id: category.id, message: messages.bind(_this, category.messageId) });
};
var transformStakeholder = function (stakeholder) {
    console.log(stakeholder);
    return __assign({}, stakeholder._doc, { _id: stakeholder.id });
};
var issues = function (issueIds) {
    return IssueModel.find({ _id: { $in: issueIds } })
        .then(function (issues) {
        return issues.map(function (issue) {
            return transformIssue(issue);
        });
    })
        .catch(function (err) {
        throw err;
    });
};
var loadingstation = function (loadingstationId) {
    return LoadingstationModel.findById(loadingstationId)
        .then(function (loadingstation) {
        return loadingstation;
        // return transformLoadingstation(loadingstation)
    })
        .catch(function (err) {
        throw err;
    });
};
var categories = function (categoryIds) {
    return CategoryModel.find({ _id: { $in: categoryIds } })
        .then(function (categories) {
        return categories.map(function (category) {
            return transformCategory(category);
        });
    })
        .catch(function (err) {
        throw err;
    });
};
var stakeholder = function (stakeholderIds) {
    return StakeholderModel.findById(stakeholderIds)
        .then(function (stakeholder) {
        return transformStakeholder(stakeholder);
    })
        .catch(function (err) {
        throw err;
    });
};
var messages = function (messageIds) {
    return MessageModel.find({ _id: { $in: messageIds } })
        .then(function (messages) {
        return messages.map(function (message) {
            return transformMessage(message);
        });
    })
        .catch(function (err) {
        throw err;
    });
};
var user = function (userId) {
    return User.findById(userId)
        .then(function (user) {
        return transformUser(user);
    })
        .catch(function (err) {
        throw err;
    });
};
exports.transformIssue = transformIssue;
exports.transformMessage = transformMessage;
exports.transformCategory = transformCategory;
exports.transformStakeholder = transformStakeholder;
exports.transformUser = transformUser;
// exports.transformLoadingstation = transformLoadingstation;
// exports.issues = issues;
