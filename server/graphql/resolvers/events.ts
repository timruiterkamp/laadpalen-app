export {};
const EventModel = require("../../models/event");
const { dateToString } = require("../../helpers/date");
const { transformEvent } = require("./merge");
const User = require("../../models/user");

module.exports = {
  events: () => {
    return EventModel.find()
      .then((events: any) => {
        return events.map((event: any) => {
          return transformEvent(event);
        });
      })
      .catch((err: string) => {
        throw err;
      });
  },
  createEvent: (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated.");
    }
    const event = new EventModel({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    });

    type EventObject = {
      title: string;
      description: string;
      price: number;
      date: string;
      creator: string;
    };

    let createdEvent = {} as EventObject;

    return event
      .save()
      .then((result: any) => {
        createdEvent = transformEvent(event);
        return User.findById(req.userId);
      })
      .then((user: any) => {
        if (!user) {
          throw new Error("User not found.");
        }
        user.createdIssues.push(event);
        return user.save();
      })
      .then((res: any) => {
        return createdEvent;
      })
      .catch((err: any) => {
        console.log(err);
        throw err;
      });
  }
};
