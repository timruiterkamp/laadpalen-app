"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require("axios");
var RequestController = /** @class */ (function () {
    function RequestController() {
    }
    RequestController.prototype.laadpalen = function (url) {
        return axios
            .get(url)
            .then(function (response) { return response.data; })
            .catch(function (err) {
            throw err;
        });
    };
    return RequestController;
}());
exports.RequestController = RequestController;
