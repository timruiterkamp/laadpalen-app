export {};
const IssueModel = require("../../models/issue");
const LoadingstationModel = require("../../models/loadingstation");
const { transformIssue, transformLoadingstation } = require("./merge");
const User = require("../../models/user");
const ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose')


module.exports = {
  issue: (params: object) => {
    return IssueModel.findById(params.id)
      .then((issue: any) => {
        return transformIssue(issue)
      })
      .catch((err: string) => {
        throw err;
      });
  },
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
  updateIssue: (issueId: string) => {
    return IssueModel.findById(issueId)
      .then((issue: any) => {
        return transformIssue(issue);
      })
      .catch((err: string) => {
        throw err;
      });
  },
  createIssue: (args: any, req: any) => {
    const issue = new IssueModel({
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

    type issueObject = {
      title: string;
      description: string;
      location: string;
      status: string;
      polenumber: number;
      createdAt: string;
      creator: string;
      image: string;
      stakeholders: string;
      loadingstation: string;
    };

    let createdIssue = {} as issueObject;

    if (!req.userId) {
      return issue
        .save()
        .then((result: any) => {
          createdIssue = transformIssue(issue);
        })
        .then((res: any) => {
          return createdIssue;
        })
        .catch((err: any) => {
          throw err;
        });
    }

    return issue
      .save()
      .then((result: any) => {
        createdIssue = transformIssue(issue);
        /* Write issue to User */
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
        /* Write issue to loadingstation */
        return LoadingstationModel.findById(issue.loadingstation);
      })
      .then((loadingstation: any) => {
        if (!loadingstation) {
          throw new Error("Loadingstation not found.");
        }
        loadingstation.issues.push(issue);
        return loadingstation.save();
      })
      .then((res: any) => {
        return createdIssue;
      })
      .catch((err: any) => {
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
