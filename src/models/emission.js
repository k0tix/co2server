const emission = (sequelize, DataTypes) => {
  const Emission = sequelize.define('emission',
    {
      value: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      /*
      * perCapitaValue is calculated when the database is
      * updated so it doesn't have to be calculated
      * on client side
      */
      perCapitaValue: {
        type: DataTypes.DECIMAL,
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