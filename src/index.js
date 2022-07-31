const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { connectDB } = require("./db");
const { authenticate } = require("./middlewares/auth");

connectDB();
const app = express();

app.listen(5000);

app.use(authenticate);

app.get("/", (req, res) => {
  res.send("Welcome to blog GraphQL & NodeJS");
});

app.use(
  "/graphql",

  graphqlHTTP({
    schema, // obj to consult
    graphiql: true, // interface to consult
  })
);
