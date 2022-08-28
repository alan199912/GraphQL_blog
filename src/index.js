const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { connectDB } = require("./db");
const { authenticate } = require("./middlewares/auth");
const cors = require("cors");

connectDB();
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.listen(5000);

// FIXME: we dont use this anymore
// app.use(authenticate);

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
