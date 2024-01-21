const userResolver = require("./user.resolver");
const eventResolver = require("./event.resolver");
const bookingResolver = require("./booking.resolver");
const authResolver = require("./auth.resolver");

const rootResolver = {
  ...userResolver,
  ...eventResolver,
  ...bookingResolver,
  ...authResolver,
};

module.exports = rootResolver;
