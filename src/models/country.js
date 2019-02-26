const country = (sequelize, DataTypes) => {

  const Country = sequelize.define('country',
    {
      name: DataTypes.STRING,
      code: { type: DataTypes.STRING, primaryKey: true}
    },
    {
      timestamps: false
    }
  )

  Country.associate = (models) => {
    Country.hasMany(models.Emission)
    Country.hasMany(models.Population)
  }

  return Country
}

module.exports = country