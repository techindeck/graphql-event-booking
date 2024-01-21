// import bcrypt
const bcrypt = require("bcryptjs");

// Application Models
const User = require("../../models/user.model");
const { events } = require("./merge.resolver");

module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          ...user._doc,
          password: null,
          createdEvents: events.bind(this, user._doc.createdEvents),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      // Check if user already exists
      // const existingUser = await User.findOne({ email: args.userInput.email });
      // if (existingUser) {
      //   throw new Error("User already exists");
      // }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return {
        ...result._doc,
        password: null,
        createdEvents: events.bind(this, result._doc.createdEvents),
      };
    } catch (err) {
      throw err;
    }
  },
};
