export {};
const IssueModel = require("../../models/issue");
const LoadingstationModel = require("../../models/loadingstation");
const { transformIssue, transformLoadingstation } = require("./merge");
const User = require("../../models/user");
const ObjectID = require("mongodb").ObjectID;
const mongoose = require("mongoose");

type issueObject = {
  id: string;
  title: string;
  location: string;
  status: string;
  createdAt: string;
  creator: string;
  image: string;
  stakeholders: string;
  loadingstation: string;
};

module.exports = {
  issue: (params: issueObject) => {
    return IssueModel.findById(params.id)
      .then((issue: issueObject) => {
        return transformIssue(issue);
      })
      .catch((err: string) => {
        throw err;
      });
  },
  issues: () => {
    return IssueModel.find()
      .then((issues: Array<issueObject>) => {
        return issues.map((issue: issueObject) => {
          return transformIssue(issue);
        });
      })
      .catch((err: string) => {
        throw err;
      });
  },
  updateIssue: async (args: any) => {
    const issues = IssueModel.find({ _id: { $in: args.id } });
    return issues.map((issue: any) => {
      const keys = Object.keys(args.issueInput);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        issue[0][key] = args.issueInput[key];
      }

      return issue[0]
        .save()
        .then((res: any) => {
          return { ...res._doc };
        })
        .catch((err: string) => {
          throw new Error(err);
        });
    });
  },
  createIssue: (args: any, req: any) => {
    const issue = new IssueModel({
      title: args.issueInput.title,
      location: args.issueInput.location,
      status: args.issueInput.status,
      createdAt: args.issueInput.createdAt,
      creator: req.userId,
      image: args.issueInput.image,
      stakeholders: args.issueInput.stakeholderId,
      loadingstation: args.issueInput.loadingstationId
    });

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
