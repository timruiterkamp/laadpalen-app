"use strict";
var Mongoose = require("mongoose");
var MongooseSchema = Mongoose.Schema;
var loadingstationSchema = new MongooseSchema({
    longitude: {
        type: Number,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    region: {
        type: String,
        required: false
    },
    regioncode: {
        type: String,
        required: false
    },
    district: {
        type: String,
        required: false
    },
    subdistrict: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    postalcode: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        required: false
    },
    sockets: {
        type: Number,
        required: false
    },
    usedsockets: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    issues: [
        {
            type: MongooseSchema.Types.ObjectId,
            ref: "Issue"
        }
    ],
});
module.exports = Mongoose.model("Loadingstation", loadingstationSchema);
