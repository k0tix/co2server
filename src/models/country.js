const country = (sequelize, DataTypes) => {
  const Country = sequelize.define('country', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  })

  Country.associate = (models) => {
    Country.hasMany(models.Emission)
    Country.hasMany(models.Population)
  }

  return Country
}

export default country
