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
  try {
    const pointsOfInterest = await PointOfInterest.findAll()
    const searchRequest = {
      term: 'Coffee',
      location: '10005'
    }

    const client = yelp.client(apiKey)

    client
      .search(searchRequest)
      .then(response => {
        const rawResult = response.jsonBody.businesses
        // const prettyJson = JSON.stringify(firstResult, null, 4)
        let cleanResult = rawResult.map(el => {
          return {
            name: el.name,
            longitude: el.coordinates.longitude,
            latitude: el.coordinates.latitude,
            imageUrl: el.image_url
          }
        })

        // console.log(firstResult)
        res.json([...pointsOfInterest, ...cleanResult])
      })
      .catch(e => {
        console.log(e)
      })
  } catch (err) {
    next(err)
  }
})
