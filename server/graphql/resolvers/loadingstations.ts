export {};
import LoadingstationInterface from "../../interfaces/Interfaces";
const LoadingstationModel = require("../../models/loadingstation");
const { transformLoadingstation } = require("./merge");

module.exports = {
  loadingstations: () => {
    return LoadingstationModel.find()
      .then((loadingstations: any) => {
        return loadingstations;
        // .map((loadingstation: any) => {
        //   return transformLoadingstation(loadingstation);
        // });
      })
      .catch((err: string) => {
        throw err;
      });
  },
  updateLoadingstation: async (args: any) => {
    const loadingstations = LoadingstationModel.find({ _id: { $in: args.id } });
    return loadingstations.map((loadingstation: any, index: number) => {
      const keys = Object.keys(args.loadingstationInput);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        loadingstation[0][key] = args.loadingstationInput[key];
      }

      return loadingstation[0]
        .save()
        .then((res: any) => {
          // console.log(res);
          return { ...res._doc };
        })
        .catch((err: string) => {
          console.error(err);
          throw new Error(err);
        });
    });
  }
  // updateLoadingstation: (loadingstationId: string) => {
  //   return LoadingstationModel.findById(loadingstationId)
  //     .then((loadingstation: any) => {
  //       return transformLoadingstation(loadingstation);
  //     })
  //     .catch((err: string) => {
  //       throw err;
  //     });
  // },
  // createIssue: (args: any, req: any) => {
  //   const issue = new IssueModel({
  //     title: args.issueInput.title,
  //     description: args.issueInput.description,
  //     location: args.issueInput.location,
  //     status: args.issueInput.status,
  //     polenumber: args.issueInput.polenumber,
  //     createdAt: args.issueInput.createdAt,
  //     creator: req.userId,
  //     image: args.issueInput.image,
  //     stakeholders: args.issueInput.stakeholderId
  //   });
  //
  //   type issueObject = {
  //     title: string;
  //     description: string;
  //     location: string;
  //     status: string;
  //     polenumber: number;
  //     createdAt: string;
  //     creator: string;
  //     image: string;
  //     stakeholders: string;
  //   };
  //
  //   let createdIssue = {} as issueObject;
  //
  //   if (!req.userId) {
  //     return issue
  //       .save()
  //       .then((result: any) => {
  //         createdIssue = transformIssue(issue);
  //       })
  //       .then((res: any) => {
  //         return createdIssue;
  //       })
  //       .catch((err: any) => {
  //         throw err;
  //       });
  //   }
  //
  //   return issue
  //     .save()
  //     .then((result: any) => {
  //       createdIssue = transformIssue(issue);
  //       console.log(req.userId);
  //       return User.findById(req.userId);
  //     })
  //     .then((user: any) => {
  //       if (!user) {
  //         throw new Error("User not found.");
  //       }
  //       user.createdIssues.push(issue);
  //       return user.save();
  //     })
  //     .then((res: any) => {
  //       return createdIssue;
  //     })
  //     .catch((err: any) => {
  //       throw err;
  //     });
  // }
};

// exports = module.exports = function((io: any)){
//   io.sockets.on('connection', function (socket) {
//     socket.on('file1Event', function () {
//       console.log('file1Event triggered');
//     });
//   });
// }
