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
Object.defineProperty(exports, "__esModule", { value: true });
var CategoryModel = require("../../models/category");
module.exports = {
    categories: function () {
        return CategoryModel.find()
            .then(function (categories) {
            return categories.map(function (category) {
                return __assign({}, category._doc, { _id: category.id });
            });
        })
            .catch(function (err) {
            throw err;
        });
    },
    createCategory: function (args, req) {
        return CategoryModel.findOne({ title: args.categoryInput.title })
            .then(function (category) {
            if (category) {
                throw new Error("category already exists.");
            }
            return category;
        })
            .then(function (result) {
            var category = new CategoryModel({
                title: args.categoryInput.title
            });
            return category
                .save()
                .then(function (result) {
                return __assign({}, result._doc, { _id: result.id });
            })
                .catch(function (err) {
                throw err;
            });
        })
            .catch(function (err) {
            throw err;
        });
    }
};
