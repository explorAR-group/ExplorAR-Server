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
    firstName: 'Roberto',
    lastName: 'Brillemourg',
    email: 'roberto.brillembourg@gmail.com',
    password: '123',
    isAdmin: true
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'jsmith@gmail.com',
    password: '123',
    isAdmin: false
  }
]

const PointOfInterestArr = [
  {
    name: 'Wall St. Bull',
    longitude: -74.013441,
    latitude: 40.705568,
    imageUrl: 'https://c1.staticflickr.com/7/6028/5921525870_f66936c8cf_b.jpg',
    description:
      'Charging Bull, which is sometimes referred to as the Wall Street Bull or the Bowling Green Bull, is a bronze sculpture that stands in Bowling Green in the Financial District in Manhattan, New York City. Originally guerrilla art, installed unofficially by Arturo Di Modica its popularity led to it being a permanent feature.',
    category: 'Attractions'
  },
  {
    name: 'NYSE',
    longitude: -74.009103,
    latitude: 40.705059,
    imageUrl: 'https://finviz.com/image.ashx?dow&rev=636934304936963417',
    description:
      "The New York Stock Exchange (NYSE, nicknamed The Big Board)[6] is an American stock exchange located at 11 Wall Street, Lower Manhattan, New York City, New York. It is by far[7][8] the world's largest stock exchange by market capitalization of its listed companies at US$30.1 trillion as of February 2018.[9] ",
    category: 'Attractions'
  },
  {
    name: 'Federal Hall',
    longitude: -74.010361,
    latitude: 40.707215,
    imageUrl:
      'http://4.bp.blogspot.com/_3k2ilY9vkCY/S-AKl_y6WiI/AAAAAAAAAik/tlHO5kZkTpU/s1600/index3.jpg',
    description:
      'Federal Hall is the name given to the first of two historic buildings located at 26 Wall Street, New York City. The original, a Greek Revival structure completed in 1703, served as New Yorks first City Hall. It was the site where the colonial Stamp Act Congress met to draft its message to King George III claiming entitlement to the same rights as the residents of Britain and protesting "taxation without representation".',
    category: 'Attractions'
  },
  {
    name: 'Trinity Church',
    longitude: -74.012181,
    latitude: 40.708104,
    imageUrl: 'https://www.nyc-architecture.com/LM/LM-wurts-trinity-church.jpg',
    description:
      'Trinity Church is a historic parish church in the Episcopal Diocese of New York located near the intersection of Wall Street and Broadway in the lower Manhattan section of New York City, New York. Known for both its location and endowment,[4] Trinity is a traditional high church, with an active parish centered around the Episcopal Church and the worldwide Anglican Communion in missionary, outreach, and fellowship.',
    category: 'Attractions'
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
