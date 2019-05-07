const router = require('express').Router()
const {PointOfInterest} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const pointsOfInterest = await PointOfInterest.findAll()
    res.json(pointsOfInterest)
  } catch (err) {
    next(err)
  }
})
