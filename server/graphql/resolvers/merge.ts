const User = require("../../models/user");
const EventModel = require("../../models/event");
const { dateToString } = require("../../helpers/date");

const transformEvent = (event: any) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};

const events = (eventIds: string) => {
  return EventModel.find({ _id: { $in: eventIds } })
    .then((events: any) => {
      return events.map((event: any) => {
        return transformEvent(event);
      });
    })
    .catch((err: string) => {
      throw err;
    });
};
const user = (userId: string) => {
  return User.findById(userId)
    .then((user: any) => {
      return {
        ...user._doc,
        _id: user.id,
        createdIssues: events.bind(this, user._doc.createdIssues)
      };
    })
    .catch((err: string) => {
      throw err;
    });
};

exports.transformEvent = transformEvent;
// exports.events = events;
