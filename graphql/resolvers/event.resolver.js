const { dateToString } = require("../../helpers/date.helper");

// Application Models
const Event = require("../../models/event.model");
const User = require("../../models/user.model");
const { transformEvent } = require("./merge.resolver");

module.exports = {
  events: async (args, req) => {
    try {
      // check if user is authenticated
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }

      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: "658a754c35fe1cfdb397c519",
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById("658a754c35fe1cfdb397c519");

      if (!creator) {
        throw new Error("User not found");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
};
