"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcrypt = require("bcryptjs");
var User = require("../../models/user");
var jwt = require("jsonwebtoken");
module.exports = {
    createUser: function (args, req) {
        return User.findOne({
            email: args.userInput.email
        })
            .then(function (user) {
            if (user) {
                throw new Error("User exist already.");
            }
            return bcrypt.hash(args.userInput.password, 12);
        })
            .then(function (hashedPassword) {
            var user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            return user.save();
        })
            .then(function (result) {
            return __assign({}, result._doc, { password: null, _id: result.id });
        })
            .catch(function (err) {
            throw err;
        });
    },
    login: function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(_this, void 0, void 0, function () {
            var user, isEqual, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error("User does not exist.");
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isEqual = _b.sent();
                        if (!isEqual) {
                            throw new Error("Password is incorrect.");
                        }
                        token = jwt.sign({ userId: user.id, email: user.email }, "cFokTdiILPLcmTdw4mn1", { expiresIn: "12h" });
                        return [2 /*return*/, { userId: user.id, token: token, tokenExpiration: 1 }];
                }
            });
        });
    }
};
