export {};
const MessageModel = require("../../models/message");
const { transformMessage } = require("./merge");
const User = require("../../models/user");

module.exports = {
  messages: () => {
    return MessageModel.find()
      .then((messages: any) => {
        return messages.map((message: any) => {
          return transformMessage(message);
        });
      })
      .catch((err: string) => {
        throw err;
      });
  },
  createMessage: (args: any, req: any) => {
    const message = new MessageModel({
      message: args.messageInput.message,
      createdAt: args.messageInput.createdAt,
      user: "5cf921362e18c62976b56934"
    });

    type messageObject = {
      message: string;
      createdAt: string;
      user: string;
    };

    let createdMessage = {} as messageObject;

    return message
      .save()
      .then((result: any) => {
        createdMessage = transformMessage(message);
        return User.findById("5cf921362e18c62976b56934");
      })
      .then((user: any) => {
        console.log(user);
        User.findById("5cf921362e18c62976b56934");

        if (!user) {
          throw new Error("User not found.");
        }
        console.log("komt hier: " + user, message);
        user.createdMessages.push(message);
        return user.save();
      })
      .then((res: any) => {
        return createdMessage;
      })
      .catch((err: any) => {
        throw err;
      });
  }
};
