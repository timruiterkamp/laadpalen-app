"use strict";
var jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    var authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    var token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }
    var decodededToken;
    try {
        decodededToken = jwt.verify(token, "cFokTdiILPLcmTdw4mn1");
    }
    catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodededToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodededToken.userId;
    next();
};
