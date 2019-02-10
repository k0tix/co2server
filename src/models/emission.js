const emission = (sequelize, DataTypes) => {
  const Emission = sequelize.define('emission', {
    value: DataTypes.BIGINT
  })

  Emission.associate = (models) => {
    Emission.belongsTo(models.Country)
  }

  return Emission
}

export default emission
