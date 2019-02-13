import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PWD,
  {
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
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

export default models