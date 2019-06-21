"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingstationModel = require("../../models/loadingstation");
var transformLoadingstation = require("./merge").transformLoadingstation;
module.exports = {
    loadingstations: function () {
        return LoadingstationModel.find()
            .then(function (loadingstations) {
            return loadingstations;
            // .map((loadingstation: any) => {
            //   return transformLoadingstation(loadingstation);
            // });
        })
            .catch(function (err) {
            throw err;
        });
    },
};
// exports = module.exports = function((io: any)){
//   io.sockets.on('connection', function (socket) {
//     socket.on('file1Event', function () {
//       console.log('file1Event triggered');
//     });
//   });
// }
