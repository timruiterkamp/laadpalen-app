const User = require("../../models/user");
import Stakeholder from "../../interfaces/Interfaces";
const IssueModel = require("../../models/issue");
const MessageModel = require("../../models/message");
const CategoryModel = require("../../models/category");
const StakeholderModel = require("../../models/stakeholder");
const LoadingstationModel = require("../../models/loadingstation");
const { dateToString } = require("../../helpers/date");

type issueObject = {
  title: string;
  location: string;
  status: string;
  createdAt: string;
  creator: string;
  image: string;
  stakeholders: string;
  loadingstation: string;
};

const transformIssue = (issue: any) => {
  return {
    ...issue._doc,
    _id: issue.id,
    createdAt: new Date(issue.createdAt).toISOString(),
    creator: user.bind(this, issue.creator),
    messages: messages.bind(this, issue._doc.messages),
    stakeholders: stakeholder.bind(this, issue.stakeholders),
    loadingstation: loadingstation.bind(this, issue.loadingstation)
  };
};

// const transformLoadingstation = (loadingstation: any) => {
//   console.log(loadingstation._doc)
//   return {
//     ...loadingstation._doc,
//     _id: loadingstation.id,
//     issues: issues.bind(this, loadingstation.issues)
//   };
// };

const transformMessage = (message: any) => {
  return {
    ...message._doc,
    _id: message.id,
    user: user.bind(this, message.user),
    createdAt: new Date(message.createdAt).toISOString(),
    updatedAt: new Date(message.updatedAt).toISOString(),
    issues: issues.bind(this, message.issues),
    categories: categories.bind(this, message.categories)
  };
};

const transformUser = (user: any) => {
  // console.log(user);
  return {
    ...user._doc,
    _id: user.id,
    createdIssues: issues.bind(this, user._doc.createdIssues),
    createdMessages: messages.bind(this, user._doc.createdMessages)
  };
};

const transformCategory = (category: any) => {
  // console.log(category);
  return {
    ...category._doc,
    _id: category.id,
    message: messages.bind(this, category.messageId)
  };
};

const transformStakeholder = (stakeholder: Stakeholder) => {
  return {
    issues: stakeholder.issues,
    title: stakeholder.title,
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

const loadingstation = (loadingstationId: string) => {
  return LoadingstationModel.findById(loadingstationId)
    .then((loadingstation: any) => {
      return loadingstation;
      // return transformLoadingstation(loadingstation)
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
      return transformUser(user);
    })
    .catch((err: string) => {
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
