const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const compression = require("compression"); //added to address lighthouse text compression performance issue

// //section cors start
// const cors = require('cors');
// const FRONTEND_DOMAIN = "http://localhost:3000";
// //section cors end

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// //section cors start
// var corsOptions = {
//   origin: FRONTEND_DOMAIN,
//   credentials: true
// };
// app.use(cors(corsOptions));
// //section cors end

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression()); //added to address lighthouse text compression performance issue

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

if (process.env.NODE_ENV === "production") {
  app.get("/*", function (req, res) {
    //adjusted from "/" to "/*" to allow server to handle routes outside of client routing
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// app.get("/*", function (req, res) {
//   //adjusted from "/" to "/*" to allow server to handle routes outside of client routing
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
