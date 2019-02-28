const Sequelize = require('sequelize')

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//     dialesctOptions: {
//       bigNumberStrings: true
//     }
// })

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PWD,
  {
    dialect: 'postgres'
  }
  )

const models = {
  Country: sequelize.import('./country'),
  Emission: sequelize.import('./emission'),
  Population: sequelize.import('./population')
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

module.exports = {sequelize, models}