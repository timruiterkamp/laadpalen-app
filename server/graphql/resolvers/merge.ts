const User = require("../../models/user");
const IssueModel = require("../../models/issue");
const { dateToString } = require("../../helpers/date");

const transformIssue = (issue: any) => {
  console.log(issue.created);
  return {
    ...issue._doc,
    _id: issue.id,
    creator: user.bind(this, issue.creator)
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
const user = (userId: string) => {
  return User.findById(userId)
    .then((user: any) => {
      return {
        ...user._doc,
        _id: user.id,
        createdIssues: issues.bind(this, user._doc.createdIssues)
      };
    })
    .catch((err: string) => {
      throw err;
    });
};

exports.transformIssue = transformIssue;
// exports.issues = issues;
