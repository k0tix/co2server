const population = (sequelize, DataTypes) => {
    const Population = sequelize.define('population',
        {
            value: {
                type: DataTypes.BIGINT,
                allowNull: true
            },
            year: DataTypes.STRING
        },
        {
            timestamps: false
        }
    )

    Population.associate = (models) => {
        Population.belongsTo(models.Country)
    }

    return Population
}

export default population