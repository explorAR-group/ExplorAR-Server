const Sequelize = require('sequelize')
const db = require('../db.js')

const pointOfInterest = db.define('pointOfInterest', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  longitude: {
    type: Sequelize.DECIMAL
  },
  latitude: {
    type: Sequelize.DECIMAL
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/03/25053846/Jet-PNG-Image.png'
  },
  description: {
    type: Sequelize.TEXT
  },
  models: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = pointOfInterest
