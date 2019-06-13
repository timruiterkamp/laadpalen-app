"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var axios = require("axios");
var port = process.env.PORT || 3000;
var server = app.listen(port);
// Create a new express application instance
server.timeout = 1000 * 60 * 10; // 10 minutes
// Use middleware to set the default Content-Type
app.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});
app.get("/api/laadpalen", function(req, res) {
  axios
    .get(
      "https://www.oplaadpalen.nl/api/maplist/clusterset?box=52.35351489560789,4.871848199417968,52.368636728344434,4.943259332230468&zoom=15&accessType=public,company&available=available,charging&power=fast,normal"
    )
    .then(function(response) {
      return res.send(JSON.stringify(response.data));
    })
    .catch(function(err) {
      throw err;
    });
});
