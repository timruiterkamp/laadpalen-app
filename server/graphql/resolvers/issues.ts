export {};
const IssueModel = require("../../models/issue");
const { transformIssue } = require("./merge");
const User = require("../../models/user");

module.exports = {
  issues: () => {
    return IssueModel.find()
      .then((issues: any) => {
        return issues.map((issue: any) => {
          return transformIssue(issue);
        });
      })
      .catch((err: string) => {
        throw err;
      });
  },
  createIssue: (args: any, req: any) => {
    // if (!req.isAuth) {
    //   throw new Error("Not authenticated.");
    // }
    const issue = new IssueModel({
      title: args.issueInput.title,
      description: args.issueInput.description,
      location: args.issueInput.location,
      status: args.issueInput.status,
      polenumber: args.issueInput.polenumber,
      created: args.issueInput.date,
      creator: req.userId,
      image: args.issueInput.image
    });

    type issueObject = {
      title: string;
      description: string;
      location: string;
      status: string;
      polenumber: number;
      created: string;
      creator: string;
      image: string;
    };

    let createdissue = {} as issueObject;

    return issue
      .save()
      .then((result: any) => {
        createdissue = transformIssue(issue);
        return User.findById(req.userId);
      })
      .then((user: any) => {
        if (!user) {
          throw new Error("User not found.");
        }
        user.createdIssues.push(issue);
        return user.save();
      })
      .then((res: any) => {
        return createdissue;
      })
      .catch((err: any) => {
        console.log(err);
        throw err;
      });
  }
};
