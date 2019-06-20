"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var app = express();
var graphqlHTTP = require("express-graphql");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var port = process.env.PORT || 3001;
var cors = require("cors");
var graphqlSchema = require("./graphql/schema/index");
var graphqlResolvers = require("./graphql/resolvers/index");
var requests_1 = require("./requests/requests");
var isAuth = require("./middleware/is-auth");
var http = require("http");
var socketIO = require("socket.io");
var server = http.createServer(app);
var SocketController = require("./sockets/sockets").SocketController;
var sockets = new SocketController();
// This creates our socket using the instance of the server
var io = socketIO(server);
// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json");
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(isAuth);
app.use("/graphql", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));
app.get("/api/laadpalen", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var ApiController, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ApiController = new requests_1.RequestController();
                return [4 /*yield*/, ApiController.laadpalen("https://www.oplaadpalen.nl/api/maplist/clusterset?box=52.35351489560789,4.871848199417968,52.368636728344434,4.943259332230468&zoom=15&accessType=public,company&available=available,charging&power=fast,normal")];
            case 1:
                data = _a.sent();
                res.send(JSON.stringify(data));
                return [2 /*return*/];
        }
    });
}); });
io.on("connection", function (socket) {
    console.log("User connected");
    socket.on("issue created", function (data) {
        console.log("issue created", data);
        io.sockets.emit("issue has been created", data);
    });
    sockets.createdIssueSocket(socket, io);
    sockets.updatedIssueSocket(socket, io);
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});
mongoose
    .connect("mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@laadpalen-db-6xhlt.mongodb.net/" + process.env.MONGO_DB + "?retryWrites=true&w=majority")
    .then(function () {
    server.listen(port, function () { return console.log("Listening on port " + port); });
})
    .catch(function (err) {
    throw err;
});
