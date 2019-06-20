"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketController = /** @class */ (function () {
    function SocketController() {
    }
    SocketController.prototype.createdIssueSocket = function (socket, io) {
        socket.on("issue created", function (data) {
            console.log("issue created", data);
            io.sockets.emit("issue has been created", data);
        });
    };
    SocketController.prototype.updatedIssueSocket = function (socket, io) {
        socket.on("issue has been updated", function (data) {
            console.log("issue has been updated", data);
            io.sockets.emit("issue status has been updated", data);
        });
    };
    return SocketController;
}());
exports.SocketController = SocketController;
