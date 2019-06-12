const User = require("../../models/user");
const IssueModel = require("../../models/issue");
const MessageModel = require("../../models/message");
const CategoryModel = require("../../models/category");
const StakeholderModel = require("../../models/stakeholder");

const { dateToString } = require("../../helpers/date");

const transformIssue = (issue: any) => {
  return {
    ...issue._doc,
    _id: issue.id,
    creator: user.bind(this, issue.creator),
    messages: messages.bind(this, issue._doc.messages),
    stakeholders: stakeholder.bind(this, issue.stakeholders)
  };
};

const transformMessage = (message: any) => {
  return {
    ...message._doc,
    _id: message.id,
    user: user.bind(this, message.user),
    issues: issues.bind(this, message.issues),
    categories: categories.bind(this, message.categories)
  };
};

const transformCategory = (category: any) => {
  return {
    ...category._doc,
    _id: category.id,
    message: messages.bind(this, category.messageId)
  };
};

const transformStakeholder = (stakeholder: any) => {
  return {
    ...stakeholder._doc,
    _id: stakeholder.id
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

const categories = (categoryIds: string) => {
  return CategoryModel.find({ _id: { $in: categoryIds } })
    .then((categories: any) => {
      return categories.map((category: any) => {
        return transformCategory(category);
      });
    })
    .catch((err: string) => {
      throw err;
    });
};

const stakeholder = (stakeholderIds: string) => {
  return StakeholderModel.findById(stakeholderIds)
    .then((stakeholder: any) => {
      return transformStakeholder(stakeholder);
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
exports.transformCategory = transformCategory;
exports.transformStakeholder = transformStakeholder;
// exports.issues = issues;
