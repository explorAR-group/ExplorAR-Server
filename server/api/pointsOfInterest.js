const router = require('express').Router()
const {PointOfInterest} = require('../db/models')
;('use strict')

const yelp = require('yelp-fusion')

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey =
  'xQVp9_ngdi2JciR2MSez0Iwq5w8GKCNAy04bZl0ihr8EssWcwLKlkLzop_qn9-tE73BrVkNe4YdyM2mlRmfRF2vJ7kpfNNbK27YMr8lu9EGJarPxDdzgwIfob43UXHYx'

module.exports = router

router.get('/', async (req, res, next) => {
  const lat = req.query.lat
  const long = req.query.long

  try {
    // get DB POIs
    const pointsOfInterest = await PointOfInterest.findAll()

    //get yelp restaurants list
    const resSearchRequest = {
      term: 'restaurants',
      latitude: lat,
      longitude: long,
      limit: 10
    }
    const client = yelp.client(apiKey)

    let resResponse = await client.search(resSearchRequest)

    const resRawResult = resResponse.jsonBody.businesses
    let restaurantResult = resRawResult.map(el => {
      return {
        id: el.id,
        name: el.name,
        longitude: el.coordinates.longitude,
        latitude: el.coordinates.latitude,
        imageUrl: el.image_url,
        yelpRating: el.rating,
        reviewCount: el.review_count,
        address: el.location.address1,
        category: 'Restaurants'
      }
    })

    //get yelp bars list
    const barSearchRequest = {
      term: 'bars',
      latitude: lat,
      longitude: long,
      limit: 10
    }
    let barResponse = await client.search(barSearchRequest)

    const barRawResult = barResponse.jsonBody.businesses
    let barResult = barRawResult.map(el => {
      return {
        id: el.id,
        name: el.name,
        longitude: el.coordinates.longitude,
        latitude: el.coordinates.latitude,
        imageUrl: el.image_url,
        yelpRating: el.rating,
        reviewCount: el.review_count,
        address: el.location.address1,
        category: 'Bars'
      }
    })

    // de-duplicate bars and restaurants
    let restaurantIDs = restaurantResult.map(rest => rest.id)
    barResult = barResult.filter(bar => !restaurantIDs.includes(bar.id))

    // send results of DB and Yelp POIs
    res.json([...pointsOfInterest, ...restaurantResult, ...barResult])
  } catch (err) {
    next(err)
  }
})
