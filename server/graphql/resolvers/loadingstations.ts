export {};
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
      if (args.loadingstationInput.longitude) {
        loadingstation[index].longitude = args.loadingstationInput.longitude;
      }

      if (args.loadingstationInput.latitude) {
        loadingstation[0].latitude = args.loadingstationInput.latitude;
      }

      if (args.loadingstationInput.city) {
        loadingstation[0].city = args.loadingstationInput.city;
      }

      if (args.loadingstationInput.region) {
        loadingstation[0].region = args.loadingstationInput.region;
      }

      if (args.loadingstationInput.regioncode) {
        loadingstation[0].regioncode = args.loadingstationInput.regioncode;
      }

      if (args.loadingstationInput.district) {
        loadingstation[0].district = args.loadingstationInput.district;
      }

      if (args.loadingstationInput.address) {
        loadingstation[0].address = args.loadingstationInput.address;
      }

      if (args.loadingstationInput.postalcode) {
        loadingstation[0].postalcode = args.loadingstationInput.postalcode;
      }

      if (args.loadingstationInput.provider) {
        loadingstation[0].provider = args.loadingstationInput.provider;
      }

      if (args.loadingstationInput.sockets) {
        loadingstation[0].sockets = args.loadingstationInput.sockets;
      }

      if (args.loadingstationInput.usedsockets) {
        loadingstation[0].usedsockets = args.loadingstationInput.usedsockets;
      }

      if (args.loadingstationInput.status) {
        loadingstation[0].status = args.loadingstationInput.status;
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
