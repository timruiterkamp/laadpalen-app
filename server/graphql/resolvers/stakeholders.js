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
var StakeholderModel = require("../../models/stakeholder");
var transformStakeholder = require("./merge").transformStakeholder;
module.exports = {
    stakeholders: function () {
        return StakeholderModel.find()
            .then(function (stakeholders) {
            return stakeholders.map(function (stakeholder) {
                return transformStakeholder(stakeholder);
            });
        })
            .catch(function (err) {
            throw err;
        });
    },
    createStakeholder: function (args, req) {
        return StakeholderModel.findOne({ title: args.stakeholderInput.title })
            .then(function (stakeholder) {
            if (stakeholder) {
                throw new Error("Stakeholder already exists.");
            }
            return stakeholder;
        })
            .then(function (result) {
            var stakeholder = new StakeholderModel({
                title: args.stakeholderInput.title
            });
            return stakeholder
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
