const User = require("../../models/user");
const IssueModel = require("../../models/issue");
const MessageModel = require("../../models/message");
const { dateToString } = require("../../helpers/date");

const transformIssue = (issue: any) => {
  console.log(issue.created);
  return {
    ...issue._doc,
    _id: issue.id,
    creator: user.bind(this, issue.creator)
  };
};

const transformMessage = (message: any) => {
  console.log(message);
  return {
    ...message._doc,
    _id: message.id,
    user: user.bind(this, message.user)
  };
};

const issues = (issueIds: string) => {
  return IssueModel.find({ _id: { $in: issueIds } })
    .then((issues: any) => {
      return issues.map((issue: any) => {
        return transformIssue(issue);
      });
    })
    .catch((err: string) => {
      throw err;
    });
};

const messages = (messageIds: string) => {
  return MessageModel.find({ _id: { $in: messageIds } })
    .then((messages: any) => {
      return messages.map((message: any) => {
        return transformMessage(message);
      });
    })
    .catch((err: string) => {
      throw err;
    });
};

const user = (userId: string) => {
  return User.findById(userId)
    .then((user: any) => {
      console.log(user);
      return {
        ...user._doc,
        _id: user.id,
        createdIssues: issues.bind(this, user._doc.createdIssues),
        createdMessages: messages.bind(this, user._doc.createdMessages)
      };
    })
    .catch((err: string) => {
      throw err;
    });
};

exports.transformIssue = transformIssue;
exports.transformMessage = transformMessage;
// exports.issues = issues;
