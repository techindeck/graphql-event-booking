const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { mongoose } = require("mongoose");

const rootSchema = require("./graphql/schemas/index");
const rootResolver = require("./graphql/resolvers/index");

const authMiddleware = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

app.use(
  "/api",
  graphqlHTTP({
    schema: rootSchema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

mongoose
  .connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
