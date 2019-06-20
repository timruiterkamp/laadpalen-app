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
var authResolver = require("./auth");
var issueResolver = require("./issues");
var loadingstationsResolver = require("./loadingstations");
var stakeholderResolver = require("./stakeholders");
var categoryResolver = require("./categories");
var messageResolver = require("./messages");
var userResolver = require("./users");
var rootResolver = __assign({}, authResolver, issueResolver, loadingstationsResolver, stakeholderResolver, categoryResolver, messageResolver, userResolver);
module.exports = rootResolver;
