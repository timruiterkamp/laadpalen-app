export class SocketController {
  createdIssueSocket(socket: any, io: any) {
    socket.on("issue created", (data: any) => {
      console.log("issue created", data);
      io.sockets.emit("issue has been created", data);
    });
  }
  updatedIssueSocket(socket: any, io: any) {
    socket.on("issue has been updated", (data: any) => {
      console.log("issue has been updated", data);
      io.sockets.emit("issue status has been updated", data);
    });
  }
}
