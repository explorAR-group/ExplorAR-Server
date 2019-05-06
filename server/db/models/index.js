'use strict'
const db = require('../db.js')
const User = require('./user')
const PointOfInterest = require('./pointOfInterest')

PointOfInterest.belongsTo(User)
User.hasMany(PointOfInterest)

module.exports = {db, User, PointOfInterest}
