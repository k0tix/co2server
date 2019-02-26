import Sequelize from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABAS_URL, {
  dialect: 'postgres',
    dialesctOptions: {
      bigNumberStrings: true
    }
})

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