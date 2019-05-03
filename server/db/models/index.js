"use strict";
const db = require("../_db");
const User = require("./user");
const PointOfInterest = require("./pointOfInterest");

PointOfInterest.belongsTo(User);
User.hasMany(PointOfInterest);

module.exports = { db, User, PointOfInterest };
