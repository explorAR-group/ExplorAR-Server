const db = require('./server/db/db.js')
const {green, red} = require('chalk')

const User = require('./server/db/models/user')
const PointOfInterest = require('./server/db/models/pointOfInterest')

const UsersArr = [
  {
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'test@admin.com',
    password: '123',
    isAdmin: true
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'jsmith@email.com',
    password: '123',
    isAdmin: false
  }
]

const PointOfInterestArr = [
  {
    name: 'Charging Bull',
    longitude: 40.7055368,
    latitude: -74.0135564,
    imageUrl: 'https://c1.staticflickr.com/7/6028/5921525870_f66936c8cf_b.jpg',
    description:
      'Charging Bull, which is sometimes referred to as the Wall Street Bull or the Bowling Green Bull, is a bronze sculpture that stands in Bowling Green in the Financial District in Manhattan, New York City. Originally guerrilla art, installed unofficially by Arturo Di Modica its popularity led to it being a permanent feature.'
  },
  {
    name: 'Wallstreet Exchange Center',
    longitude: 40.7068709,
    latitude: -74.0113638,
    imageUrl:
      'https://wtop.com/wp-content/uploads/2018/07/Financial_Markets_Wall_Street_99131-780x520.jpg',
    description:
      "The New York Stock Exchange (NYSE, nicknamed The Big Board)[6] is an American stock exchange located at 11 Wall Street, Lower Manhattan, New York City, New York. It is by far[7][8] the world's largest stock exchange by market capitalization of its listed companies at US$30.1 trillion as of February 2018.[9] "
  },
  {
    name: 'FullStack Academy',
    longitude: 40.7050665,
    latitude: -74.0092182,
    imageUrl: 'https://www.fullstackacademy.com/images/fa-logo@2x.png',
    description:
      'Fullstack Academy is a top-ranked coding bootcamp with campuses in NYC, Chicago, and online. Want to become a professional software developer?'
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      UsersArr.map(el => {
        return User.create(el)
      }),
      await Promise.all(
        PointOfInterestArr.map(el => {
          return PointOfInterest.create(el)
        })
      )
    )
    console.log(green('Seeding success!'))
    db.close()
  } catch (err) {
    console.error(red('Oh dear!!!!! Something went awry :/!'))
    console.error(err)
    db.close()
  }
}
seed()
