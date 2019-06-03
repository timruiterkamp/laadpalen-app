import express = require("express");
const app: express.Application = express();
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

const port = process.env.PORT || 3000;
const server = app.listen(port);
// Create a new express application instance
import { RequestController } from "./requests/requests";

var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  // rollDice: function({ (numDice: any, numSides:any) }) {
  //   var output = [];
  //   for (var i = 0; i < numDice; i++) {
  //     output.push(1 + Math.floor(Math.random() * (numSides || 6)));
  //   }
  //   return output;
  // }
};

// Use middleware to set the default Content-Type
app.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.get("/api/laadpalen", async (req, res) => {
  const ApiController = new RequestController();
  const data = await ApiController.laadpalen(
    "https://www.oplaadpalen.nl/api/maplist/clusterset?box=52.35351489560789,4.871848199417968,52.368636728344434,4.943259332230468&zoom=15&accessType=public,company&available=available,charging&power=fast,normal"
  );
  console.log(data);
  res.send(JSON.stringify(data));
});
