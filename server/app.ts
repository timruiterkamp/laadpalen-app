require("dotenv").config();
import express = require("express");
const app: express.Application = express();
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const cors = require("cors");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
import { RequestController } from "./requests/requests";
const isAuth = require("./middleware/is-auth");
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);

const { SocketController } = require("./sockets/sockets");
const sockets = new SocketController();
// This creates our socket using the instance of the server
const io = socketIO(server);

// Use middleware to set the default Content-Type
app.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

io.on("connection", (socket: any) => {
  console.log("User connected");

  socket.on("issue created", (data: any) => {
    console.log("issue created", data);
    io.sockets.emit("issue has been created", data);
  });

  sockets.createdIssueSocket(socket, io);
  sockets.updatedIssueSocket(socket, io);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@laadpalen-db-6xhlt.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err: any) => {
    throw err;
  });
