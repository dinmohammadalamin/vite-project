const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
// Define your schema
const schema = buildSchema(`
    type Query {
        hello: String
        number: Float
        greeting(name: String!): String
        age(age:Int):Int
    }
`);

// Define resolvers for your schema
const root = {
  hello: () => "Hello, world!",
  number: () => Math.random(),
  greeting: ({ name }) => `Hello, ${name}!`,
  age: ({ age }) => `${age}`,
};

// Create an Express app
const app = express();

// Set up the /graphql endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for testing
  })
);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`GraphQL server is running at http://localhost:${PORT}/graphql`);
});
