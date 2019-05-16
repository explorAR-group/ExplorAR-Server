const chalk = require('chalk')
const Sequelize = require('sequelize')
// const pkg = require("../../package.json");

console.log(chalk.yellow('Opening database connection'))
// console.log("PACKAGE NAME: ", pkg.name);
// create the database instance that can be used in other database files
const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false // so we don't see all the SQL query made
})

// console.log("!!!!!!!!", db);
module.exports = db
