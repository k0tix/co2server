const emission = (sequelize, DataTypes) => {
  const Emission = sequelize.define('emission',
    {
      value: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      year: DataTypes.STRING,
    },
    {
      timestamps: false
    }
  )

  Emission.associate = (models) => {
    Emission.belongsTo(models.Country)
  }

  return Emission
}

export default emission