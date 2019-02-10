const population = (sequelize, DataTypes) => {
    const Population = sequelize.define('population', {
      value: DataTypes.BIGINT
    })
  
    Population.associate = (models) => {
      Population.belongsTo(models.Country)
    }
  
    return Population
  }
  
  export default population
  