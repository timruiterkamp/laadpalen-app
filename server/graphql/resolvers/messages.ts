export {};
const MessageModel = require("../../models/message");
const { transformMessage } = require("./merge");
const User = require("../../models/user");
const Issue = require("../../models/issue");

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
      user: req.userId,
      issues: args.messageInput.issueId,
      categories: args.messageInput.categoryId
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
        return User.findById(req.userId);
      })
      .then((user: any) => {
        if (!user) {
          throw new Error("User not found.");
        }

        user.createdMessages.push(message);
        return user.save();
      })
      .then((res: any) => {
        return Issue.findById(args.messageInput.issueId);
      })
      .then((issue: any) => {
        if (!issue) {
          throw new Error("Issue not found");
        }
        issue.messages.push(message);
        issue.save();
      })
      .then((res: any) => {
        return createdMessage;
      })
      .catch((err: any) => {
        throw err;
      });
  }
};
